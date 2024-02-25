import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Peer from "peerjs";
import Avatars from "../Avatar";
const VideoCall = () => {
  const dispatch = useDispatch();
  const { videoCall, socket } = useSelector((state) => state.initMessage);
  console.log(videoCall)
  const { user } = useSelector((state) => state.initUser);
  const [callAccepted, setCallAccepted] = React.useState(false);
  const [peerId, setPeerId] = useState(null);

  const myVideo = useRef();
  const theirVideo = useRef();

  const peer = useMemo(() => new Peer(), []);

  useEffect(() => {
    if (videoCall.type === "out-going") {
      setTimeout(() => {
        setCallAccepted(true)
        },1000)
    }else{
      setTimeout(() => {
      setCallAccepted(true)
      },1000)
    }
  },[socket, videoCall])

  const endCall = () => {
   
      theirVideo.current.srcObject = null
      myVideo.current.srcObject = null;

    socket.emit("reject-video-call", {
      to: videoCall.id,
    });
    dispatch({
      type: "END_CALL",
    });
  };

  React.useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: user.id,
          avatar: user.avatar,
          name: user.name,
          peerId: peerId,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
      callUser(peerId);
    } else {
      callUser(videoCall.peerId);
    }
  }, [user, peerId, videoCall, socket]);
  
  React.useEffect(() => {
    peer.on("open", (id) => {
      setPeerId(id);
    });
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
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
      .getUserMedia({ video: true, audio: true })
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
    <div className=" border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col gap-3 items-center">
        <span className=" text-5xl">{videoCall.name}</span>
        <span className=" text-lg">
          {callAccepted && videoCall.callType !== "video"
            ? "On going call"
            : "calling"}
        </span>
      </div>
      {!callAccepted && (
        <div className=" my-24">
          <img
            src={videoCall.avatar}
            alt="avatar"
            className=" w-52 h-52 rounded-full object-cover"
          />
        </div>
      )}
      <div className=" flex w-full justify-evenly">
        <div className=" w-[40%] ">
          <video ref={myVideo} muted className=" aspect-auto " />
          <Avatars size={"sm"} image={user.avatar} />
        </div>
        <div className=" w-[40%]">
          <video ref={theirVideo} className=" aspect-auto " />
          <Avatars size={"sm"} image={videoCall.avatar} />

        </div>
      </div>
      <div className=" fixed bottom-0">
        <div
          className="h-16 w-16 cursor-pointer bg-red-500 flex justify-center items-center rounded-full "
          onClick={endCall}
        >
          <MdCallEnd size={36} />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
