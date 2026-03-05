import React from 'react'
import { useMessageStore } from '../../store/useMessageStore'
import userAvatar from "../../assets/user.png"
import {X} from "lucide-react"

const ChatContainer = () => {
  const {selectedUser,setSelectedUser} = useMessageStore()
  return (<div>
      <div className=' flex items-center justify-between  p-4 border-b-2 gap-3 border-slate-400'>
        <div className='flex gap-3 items-center'>
          {/* AVATAR */}
            <div className='relative '>
              <img className=' size-12 avatar online' src={selectedUser.profilePic ||userAvatar }/>
              <span className='absolute size-3 bottom-0 right-0 rounded-full border-2 border-black bg-green-400'></span>
            </div>
          <h1 className='text-slate-100'>{selectedUser.fullName}</h1>
        </div>
        <X className='text-slate-300' onClick={()=>(setSelectedUser(null))}/>
      </div>

      <div className='p-4'>
          <h1></h1>
      </div>

    </div>
  )
}

export default ChatContainer
