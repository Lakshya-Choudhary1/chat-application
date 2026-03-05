import React from 'react'
import {MessageSquareOff} from "lucide-react"
const NoConversationPlaceholder = () => {
  return (
    <div className=' h-full w-full flex flex-col justify-center items-center'>
      <div className='p-3  rounded-full   bg-blue-300'>
          <MessageSquareOff className='size-7  text-amber-50 '/>
      </div>
      <h1 className='text-white text-2xl m-3 text-center leading-7'>Select a conversation</h1>
      <p className='text-center leading-5'>Choose a contact from sidebar to start chatting or continue a previous Conversation.</p>
    </div>
  )
}

export default NoConversationPlaceholder
