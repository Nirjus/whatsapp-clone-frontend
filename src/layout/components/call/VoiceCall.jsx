import React,{ useMemo, useRef, useState } from 'react'
import { MdCallEnd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import Peer from "peerjs";

const VoiceCall = () => {
    const dispatch = useDispatch();
    const {voiceCall, socket} = useSelector((state)=> state.initMessage);
    console.log(voiceCall)
    const {user} = useSelector((state) => state.initUser);
      const [callAccepted, setCallAccepted] = React.useState(false);
      const [peerId, setPeerId] = useState(null);

      const myVideo = useRef();
      const theirVideo = useRef();
    
      const peer = useMemo(() => new Peer(), []);

      React.useEffect(() => {
        if (voiceCall.type === "in-coming") {
             setTimeout(() => {
            setCallAccepted(true)
          },1000)
        }else{
          setTimeout(() => {
            setCallAccepted(true)
          },1000)
        }
      },[socket, voiceCall])

      const endCall = () => {
        theirVideo.current.srcObject = null
        myVideo.current.srcObject = null;
        socket.emit("reject-voice-call", {
          to: voiceCall.id
        })
          dispatch({
            type: "END_CALL"
          })
      }

      React.useEffect(() => {
       if(voiceCall.type === "out-going"){
        socket.emit("outgoing-voice-call", {
            to: voiceCall.id,
            from:{
                id: user.id,
                avatar: user.avatar,
                name: user.name,
                peerId: peerId,
            },
            callType: voiceCall.callType,
            roomId: voiceCall.roomId
        })
        callUser(peerId);
      } else {
        callUser(voiceCall.peerId);
      }
      },[user, voiceCall, peerId,socket])

      React.useEffect(() => {
        peer.on("open", (id) => {
          setPeerId(id);
        });
        peer.on("call", (call) => {
          navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
              myVideo.current.srObject = stream;
              myVideo.current.play();
              call.answer(stream);
              call.on("stream", (remoteStream) => {
                theirVideo.current.srcObject = remoteStream;
                theirVideo.current.play();
              });
            });
        });
        return () => {
          peer.destroy();
        };
      }, [peer]);

      const callUser = (id) => {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            myVideo.current.srcObject = stream;
            myVideo.current.play();
    
            const call = peer.call(id, stream);
            call.on("stream", (remoteStream) => {
              theirVideo.current.srcObject = remoteStream;
              theirVideo.current.play();
            });
          });
      };
    

  return (
    <div className=' border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-screen overflow-hidden items-center justify-center'>
    <div className="flex flex-col gap-3 items-center">
         <span className=' text-5xl'>{voiceCall.name}</span>
         <span className=' text-lg'>
            {
                callAccepted && voiceCall.callType !== "video" ? "On going call" : "calling"
             }
         </span>
    </div>
    {
        !callAccepted && <div className=' my-24'>
        <img src={voiceCall.avatar} alt="avatar"  className=' w-52 h-52 rounded-full object-cover' />
       </div>
    }
     <div className=" flex w-full justify-evenly">
        <div className=" w-[40%] ">
          <audio ref={myVideo} muted  />
        
        </div>
        <div className=" w-[40%]">
          <audio ref={theirVideo} />

        </div>
      </div>
    <div className={`h-16 w-16 cursor-pointer animate-bounce bg-red-500 flex justify-center items-center rounded-full ${callAccepted && "mt-7"}`}
    onClick={endCall}
    >
      <MdCallEnd size={36} />
    </div>
</div>
  )
}

export default VoiceCall