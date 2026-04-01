import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingUp:false,
  
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
      toast.success(`WELCOME`);
    } catch (err) {
      console.log(err)
    } finally{
      set({isCheckingAuth:false});
    }
  },
}));