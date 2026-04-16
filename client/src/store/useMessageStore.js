import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast"
import { useAuthStore } from "./useAuthStore.js";

export const useMessageStore = create((set,get)=> ({
     allContacts:[],
     chatPartners:[],
     messages:[],
     selectedUser:null,
     activeTab:"chats",
     isUserLoading:false,
     isMessageLoading:false,
     isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true,

     subscribeToMessages: () => {
     const { selectedUser, isSoundEnable } = get();
     if (!selectedUser) return;

     const socket = useAuthStore.getState().socket;

     socket.off("new-message");

     socket.on("new-message", (data) => {
     const { message } = data;
     const { selectedUser } = get();

     if (
          message.senderId === selectedUser._id ||
          message.receiverId === selectedUser._id
     ) {
          set((state) => ({
          messages: [...state.messages, message],
          }));
     }

     if (isSoundEnable) {
          const audio = new Audio("/sounds/mouse-click-sound.mp3");
          audio.currentTime = 0;
          audio.play();
     }
     });
     },

unsubscribeToMessages: () => {
  const socket = useAuthStore.getState().socket;
  socket.off("new-message");
},
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

     getMessagesByUserId:async(id)=>{
          try{
               console.log(id)
               set({isMessageLoading:true})
               const res = await axiosInstance.get(`/message/${id}`);
               console.log("message send : ",res)
               set({messages:res.data});
          }catch(err){
               console.log(err);
          }finally{
               set({isMessageLoading:false})
          }
     },

     sendMessageToUserId:async(id,data)=>{
          const {text,image} = data
          try{
               const res = await axiosInstance.post(`/message/send/${id}`,{text,image});
               console.log(res.data)
               if(res.data){
                    toast.success("Message Sent Succesfull.")
               }
               set((state)=>({
                    messages:[...state.messages,res.data]
               }))

          }catch(err){
               console.log(err)
          }
     },

}))