import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {sendWelcomeEmail} from "../utils/emails/emailHandler.js"
import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async(req,res) =>{
     try{
          const userID = req.user.id;
          const {profilePic} = req.body;
          if(!profilePic){
               return res.status(400).json({message:"profile Pic Required"})
          }

          const uploadResponse =  await cloudinary.uploader.upload(profilePic);

          const updatedUser = await userModel.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url,updatedAt: new Date()},{new:true}).select("-password")

          return res.status(200).json({user:updatedUser});
     }catch(err){
          return res.status(400).json({message:err.message})
     }
}

export const login = async(req,res)=>{
     const {email,password} = req.body;
     try{
          //CHECK ALL FIELDS ARE PRESENT
          if(!email || !password){
               return res.status(400).json({message:"ALL FIELDS REQUIRED"})
          }

          //PASSWORD LENGTH MUST BE GREATER EQUALS TO SIX
          if(password.length < 6){
               return res.status(400).json({message:'PASSWORD IS TOO SHORT'})
          }

          //FIND USER BY EMAIL(UNIQUE)
          const user = await userModel.findOne({email});

          //IF NO USER FOUND RETURN ERROR
          if(!user){
               return res.status(400).json({message:'invalid credentials'})
          }

          const isMatch = await bcrypt.compare(password,user.password);
          
          if(!isMatch){
               return res.status(400).json({message:'incorrect password'})
          }
          
          generateTokenAndSetCookie(res,user._id);


          return res.status(200).json({user : {...user._doc,password:undefined} });

     }catch(err){
          return res.status(400).json({message:err.message})
     }
}

export const checkAuth = async(req,res)=>{
     try{
          const user =  req.user ;
          if(!user) return res.status(200).json({
                    message:"INVALID CREDENTIAL"
               })
          return res.status(200).json({message:'success',user});
     }catch(error){
          return res.status(400).json({message:error.message});
     }
}

export const logout = async(req,res)=>{
     res.clearCookie(process.env.JWT_TOKEN_NAME);
     return res.status(200).json({message:"logout successfull"})
}

export const signup = async(req,res)=>{
     try{
          const {fullName,email,password} = req.body;
     
          if(!fullName || !email || !password){
               return res.status(400).json({message:"All fields are required"})
          }

          if(password.length < 6){
               return res.status(400).json({message:'Password must be at least 6 characters  '})
          }

          const user = await userModel.findOne({email});

          if(user){
               return res.status(300).json({message:'EMAIL ALREADY EXISTS '})
          }
          
          const hashedPassword = await bcrypt.hash(password,7)
          
          const savedUser = await userModel.create({
               email,
               password:hashedPassword,
               fullName
          })

          generateTokenAndSetCookie(res,savedUser._id);

          // await sendWelcomeEmail(savedUser.email ,savedUser.name , process.env.CLIENT_URI)

          return res.status(201).json({message:'user created',user:{...savedUser._doc,password:undefined}})

     }catch(err){
          return res.status(400).json({message:err.message})
     }
}

