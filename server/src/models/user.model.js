import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
     fullName:{
          type:String,
          require:true,
     },
     email:{
          type:String,
          require:true,
          unique:true
     },
     password:{
          type:String,
          require:true,
          minlength:6
     },
     profilePic:{
          type:String,
          default:""
     }
},{timestamps:true,timeseries:true})


const userModel = mongoose.model("User",userSchema)

export default userModel;