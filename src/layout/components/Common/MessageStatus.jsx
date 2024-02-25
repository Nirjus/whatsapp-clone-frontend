import { Check, CheckCheck } from 'lucide-react'
import React from 'react'

const MessageStatus = ({messageStatus}) => {
  return (
    <>
      {messageStatus === "sent" && <Check size={16} />}
      {messageStatus === "delivered" && <CheckCheck size={16} />}
      {messageStatus === "read" && <CheckCheck size={16} className=' text-icon-ack' />}
    </>
  )
}

export default MessageStatus