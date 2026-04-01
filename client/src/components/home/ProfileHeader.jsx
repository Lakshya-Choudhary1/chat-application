import { useEffect, useRef, useState } from "react";
import {useAuthStore} from "../../store/useAuthStore.js";
import { useMessageStore } from "../../store/useMessageStore";
import avatar from "../../assets/user.png"
import { LogOutIcon ,Volume2 , VolumeOff} from "lucide-react";

const ProfileHeader = () => {
 
  const mouseClickSound = new Audio('/sounds/mouse-click-sound.mp3')
  const {isSoundEnable,toggleSound} = useMessageStore();
  const {authUser,logout,updateProfile} = useAuthStore();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) =>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async() =>{
      const base64Image = reader.result;
      await updateProfile ({profilePic:base64Image})
    }

  }

  const handleMouseClickSound = ()=>{
    if(!isSoundEnable){
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch(err=>console.log("Audio play error"))
    }
    toggleSound();
  }



  return (<div className=" relative border-b-2 border-slate-500 p-2">
      <div className="flex items-center justify-start gap-4 ">
          {/* Avatar */}
          <div className="avatar avatar-online m-1 mr-0">
            <button className="size-9
             rounded-full overflow-hidden relative group "
              onClick={()=>fileInputRef.current.click()}>
                  <img src={authUser.profilePic || avatar} alt="user image"
                  className="size-full object-cover "/>

                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity ">
                      <span className="text-white text-xs">change</span>
                  </div>
            </button>

            <input 
            className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              type="file" 
              accept="image/*" 
              multiple={false} />
          </div>

          {/* online and userName */}
          <div>
            <h3 className="text-slate-200 text-sm font-medium  max-w-45 truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>

          {/* logout and sound btn */}
          <div className="flex gap-x-3 items-center justify-center flex-1">
              <button className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}>
                <LogOutIcon className="size-5"/>
              </button>

              <button 
                className="text-slate-400 hover:text-slate-200 transition-colors"
                onClick={handleMouseClickSound}>
                {isSoundEnable ? <Volume2 className="size-5"/> : <VolumeOff className="size-5"/>}
              </button>
          </div>
      </div>
  </div>
  )
}

export default ProfileHeader
