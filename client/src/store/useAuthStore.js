import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BaseUrl = import.meta.env.MODE === "development" ?  "http://localhost:3000/messages" : `${window.location.origin}/messages`; ;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingUp:false,
  socket:null,
  onlineUsers:[],

  updateProfile: async(data)=>{
    try{
      const res = await axiosInstance.put("/user/update-profile",data);
      if (res.data?.user) {
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    }

    }catch(err){
      console.log(err)
    }
  },

  login :async (formData)=>{
    set({isLoggingUp:true})
    try{
      const res = await axiosInstance.post("/user/login",formData)
      set({authUser:res.data.user});
      toast.success("Welcome.")
    }catch(err){
      console.log(err)
      toast.error("Invalid Credantial.")
    } finally{
      set({isLoggingUp:false})
    }
  },

  logout:  async()=> {
    try{
      await axiosInstance.post("/user/logout");
      get().disconnectSocket();
      toast.success("LogOut Successfully.")
      
    }catch(err){
      console.log(err);
    } finally{
        set({authUser:null});
    }
  },
   
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/signup",formData);
      set({ authUser: res.data.user});
      toast.success("Welcome.")
    } catch (err) {
        console.log(err)
        toast.error("Invalid Credantial.")
    } finally{
      set({isSigningUp:false});
    }
  },

  checkAuth: async () => {
    set({isCheckingAuth:true})
    try {
      const res = await axiosInstance.get("/user/check-auth");
      set({ authUser: res.data.user});
      get().connectSocket();
      toast.success(`WELCOME`);
    } catch (err) {
      console.log(err)
    } finally{
      set({isCheckingAuth:false});
    }
  },

  connectSocket: () => {
  const { authUser, socket } = get();

  if (!authUser || socket?.connected) return;

  const newSocket = io(BaseUrl, {
    withCredentials: true,
    transports: ["websocket"], // 🔥 important
  });

  set({ socket: newSocket });

  // ✅ use newSocket everywhere
  newSocket.on("connect", () => {
    console.log("✅ Connected:", newSocket.id);
  });

  newSocket.on("online-users", (userIds) => {
    const uniqueUsers = [...new Set(userIds)];
    set({ onlineUsers: uniqueUsers });
  });

  newSocket.on("connect_error", (err) => {
    console.log("❌ CONNECTION ERROR:", err.message);
  });

  newSocket.on("disconnect", () => {
    console.log("❌ Disconnected");
  });
},

  disconnectSocket: () => {
    const {socket} = get(); 
    if(socket){
      get().socket.disconnect();
      set({socket:null});
    } 
  }
}));