import React, { useEffect } from 'react'
import { useMessageStore } from '../../store/useMessageStore.js'
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx"
import NoChatFound from './NoChatFound.jsx';
import userAvatar from "../../assets/user.png"
import {useAuthStore} from "../../store/useAuthStore.js"

const ChatList = () => {

  const {getMyChatPartners , chatPartners , isUsersLoading , setSelectedUser} = useMessageStore();
  const {onlineUsers} = useAuthStore();

  useEffect(()=>{
    getMyChatPartners();
  },[getMyChatPartners])


  if(isUsersLoading) return <UsersLoadingSkeleton /> 
  if(chatPartners.length === 0 ) return <NoChatFound />

  return (
  <div className="flex flex-col gap-2">
    {chatPartners.map((user) => (
      <div
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className="flex items-center gap-2 px-2 py-1 rounded-2xl cursor-pointer  hover:bg-cyan-500/10 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.profilePic || userAvatar}
            alt={user.fullName}
            className="size-9 rounded-full object-cover"
          />
          <span className={`absolute bottom-0 right-0 size-3 ${onlineUsers.includes(user._id) ? "bg-green-500 border-2 " : "bg-transparent"} border-slate-900 rounded-full`}></span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-200 text-sm font-medium truncate">
            {user.fullName}
          </h4>
        </div>
      </div>
    ))}
  </div>
);
}

export default ChatList
