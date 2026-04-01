import React, { useEffect } from 'react'
import { useMessageStore } from '../../store/useMessageStore.js'
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx"
import userAvatar from "../../assets/user.png"

const ContactList = () => {
  const {getAllContacts , allContacts , isUsersLoading , setSelectedUser} = useMessageStore();

  useEffect(()=>{
    getAllContacts();
  },[getAllContacts])

  if(isUsersLoading) return <UsersLoadingSkeleton /> 


  return (
  <div className="flex flex-col gap-6">
    {allContacts.map((user) => (
      <div
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className="flex items-center gap-4 px-2 py-1 rounded-2xl cursor-pointer  hover:bg-cyan-500/10 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.profilePic || userAvatar}
            alt={user.fullName}
            className="size-9 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-200 text-sm font-medium truncate">
            {user.fullName}
          </h4>
          <p className="text-slate-400 text-xs truncate">
            Click to start chatting
          </p>
        </div>
      </div>
    ))}
  </div>
);
}

export default ContactList;
