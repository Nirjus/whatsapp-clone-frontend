import React from 'react'
import ChatHeader from "./ChatHeader"
import ChatContainer from "./ChatContainer"
import MessageBar from "./MessageBar"
const Chat = () => {
  return (
    <div className=' border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-screen z-10'>
        <ChatHeader />
        <ChatContainer />
        <MessageBar />
    </div>
  )
}

export default Chat