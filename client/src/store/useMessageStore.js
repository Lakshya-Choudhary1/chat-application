import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast"


export const useMessageStore = create((set,get)=> ({
     allContacts:[],
     chatPartners:[],
     messages:[],
     selectedUser:null,
     activeTab:"chats",
     isUserLoading:false,
     isMessageLoading:false,
     isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true,

     toggleSound: ()=>{
          localStorage.setItem("isSoundEnable",!get().isSoundEnable)
          set({isSoundEnable: !get().isSoundEnable})
     },

     setActiveTab:(activeTab)=> set({activeTab}),

     setSelectedUser:(selectedUser)=>set({selectedUser}),

     getAllContacts: async()=>{
          set({isUserLoading:true});
          try{
               const res = await axiosInstance.get("/message/contacts");
               set({allContacts:res.data});
          }catch(err){
               console.log(err)
          }finally{
               set({isUserLoading:false});
          }
     },

     getMyChatPartners: async()=>{
          set({isUserLoading:true});
          try{
               const res = await axiosInstance.get("/message/chatPartners");
               set({chatPartners:res.data})
          }catch(err){
               console.log(err);
          }finally{
               set({isUserLoading:false});
          }
     },

     getMessages:async(id)=>{
          try{
               const res = await axiosInstance.get(`/message/${id}`);
               set({message:res.data});
          }catch(err){
               console.log(err);
          }
     },

     sendMessage:async(id,data)=>{
          try{
               const res = await axiosInstance.post(`/message/send/${id}`,data);
               if(res.data){
                    toast.success("Message Sent Succesfull.")
               }

          }catch(err){
               console.log(err)
          }
     },

}))