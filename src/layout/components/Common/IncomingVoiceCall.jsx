import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatars from '../Avatar'

const IncomingVoiceCall = () => {
  const dispatch = useDispatch();

  const {incommingVoiceCall, socket} = useSelector((state) => state.initMessage);
 console.log(incommingVoiceCall)
  const acceptCall = () => {
    dispatch({
      type: "SET_VOICE_CALL",
      voiceCall:{
          ...incommingVoiceCall,
          type:"in-coming"
      }
    });
    socket.emit("accept-incoming-call",{id:incommingVoiceCall.id})
    dispatch({
      type: "SET_INCOMING_VOICE_CALL",
      incommingVoiceCall: undefined
    });
   
  }
  const rejectcall = () => {
      socket.emit("reject-voice-call", {
          to:incommingVoiceCall.id 
      })
      dispatch({
          type: "END_CALL"
      })
     
  }


  return (
    <div className=' h-fit w-fit fixed bottom-16 right-16 z-50 rounded-sm flex gap-5 items-center justify-center bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-6 px-11'>
    <div className=" ">
        <Avatars size={"mlg"} image={incommingVoiceCall?.avatar} />
    </div>
    <div className="">
        <div className="">{incommingVoiceCall.name}</div>
        <div className=" text-xs">Incoming Voice Call</div>
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

export default IncomingVoiceCall