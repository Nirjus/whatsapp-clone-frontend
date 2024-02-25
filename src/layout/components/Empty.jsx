import React from 'react'
import gifImg from "../../assets/images/372108180_WHATSAPP_ICON_400.gif"
const Empty = () => {
  return (
    <div className=' border-conversation-border border-l w-full bg-panel-header-background flex flex-col justify-center items-center h-screen border-b-4 border-b-icon-green '>
        <img src={gifImg} alt="gif" className=' sm:w-[300px] sm:h-[300px] w-[150px] h-[150px] object-contain' />
    </div>
  )
}

export default Empty