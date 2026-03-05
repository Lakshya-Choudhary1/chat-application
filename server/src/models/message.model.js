import mongoose from 'mongoose';

const messages = new mongoose.Schema({
     senderId :{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     receiverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref : "User",
          required: true,
     },
     text: String,
     image:String
},{
     timeseries:true,
     timestamps:true
})

const messagesModel = mongoose.model("Message",messages);

export default messagesModel;