import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatars from '../Avatar';

const IncomingVideoCall = () => {
    const dispatch = useDispatch();

    const {incommingVideoCall, socket} = useSelector((state) => state.initMessage);
   console.log(incommingVideoCall)
    const acceptCall = () => {
      dispatch({
        type: "SET_VIDEO_CALL",
        videoCall:{
            ...incommingVideoCall,
            type:"in-coming"
        }
      });
      socket.emit("accept-incoming-call",{id:incommingVideoCall.id})
      dispatch({
        type: "SET_INCOMING_VIDEO_CALL",
        incommingVideoCall: undefined
      });
     
    }
    const rejectcall = () => {
        socket.emit("reject-video-call", {
            to:incommingVideoCall.id 
        })
        dispatch({
            type: "END_CALL"
        })
       
    }
  return (
    <div className=' h-fit w-fit fixed bottom-16 right-16 z-50 rounded-sm flex gap-5 items-center justify-center bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-6 px-11'>
        <div className=" ">
            <Avatars size={"mlg"} image={incommingVideoCall?.avatar} />
        </div>
        <div className="">
            <div className="">{incommingVideoCall.name}</div>
            <div className=" text-xs">Incoming Video Call</div>
            <div className="flex gap-2 mt-2">
              <button className=" bg-red-500 hover:bg-red-700 p-1 px-3 text-sm rounded-full"
              onClick={rejectcall}
              >
                Reject
              </button>
              <button className=" bg-green-500 hover:bg-green-700 p-1 px-3 text-sm rounded-full"
              onClick={acceptCall}
              >
                Accept
              </button>
            </div>
        </div>
    </div>
  )
}

export default IncomingVideoCall