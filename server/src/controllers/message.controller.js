import Message from "../models/message.model.js";
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../socket.js";
import { io } from "../server.js";
 
export const getAllContacts = async(req,res) =>{
     try{
          const loggedInUserId = req.user.id;
          const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select(["-password"]);
          return res.status(200).json(filteredUsers);
     }catch(err){
          return res.status(400).json({message:err.message})
     }
}

export const getChatPartners = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderPartners = await Message.distinct("receiverId", {
      senderId: userId
    });
    const receiverPartners = await Message.distinct("senderId", {
      receiverId: userId
    });
    const chatPartnersId = [...new Set([
      ...senderPartners,
      ...receiverPartners
    ])];
    const chatPartners = await User
      .find({ _id: { $in: chatPartnersId } })
      .select("-password");
    return res.status(200).json(chatPartners);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


export const getMessagesByUserId = async(req,res) =>{
     try{
          const myId = req.user._id;
          const userId = req.params.id;
          const messages = await Message.find({
               $or:[
                    {senderId:myId , receiverId:userId},
                    {senderId:userId , receiverId:myId}
               ]
          }).sort({createdAt:1})
          
          return res.status(200).json(messages)
     }catch(err){
          return res.status(400).json({message:err.message})
     }
}

export const sendMessage = async(req,res) =>{
     try{
          const senderId = req.user._id;
          const receiverId = req.params.id;
          const {text,image} = req.body;
          if(!text && !image){
               return res.status(400).json({message:"TEXT OR IMAGE IS REQUIRED"});
          }
          if(senderId == receiverId){
               return res.status(400).json({message:"CANT SEND YOURSELF A MESSAGE"})
          }
          const receiverExists = await User.exists({_id:receiverId});
          if(!receiverExists){
               return res.status(404).json({message:"NOT RECEIVER EXISTS"})
          }
          let imageUrl;
          if(image){
               const uploadResult = await cloudinary.uploader.upload(image); 
               imageUrl = uploadResult.secure_url;
          }
          
          const newMessage = await Message.create({
               senderId,
               receiverId,
               text,
               image:imageUrl
          });

          const receiverSocketIds = getReceiverSocketId(receiverId);

          if (receiverSocketIds) {
          receiverSocketIds.forEach((socketId) => {
          io.of("/messages").to(socketId).emit("new-message", {
               message: newMessage,
          });
          });
          }

          
          
          return res.status(200).json(newMessage)
     }catch(err){
          return res.status(400).json({message:err.message})
     }
} 

