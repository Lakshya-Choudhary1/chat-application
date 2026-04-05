import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import "dotenv/config"
import cookie from "cookie";

export const socketAuthMiddleware = async(socket,next) => {
     try{
         const cookies = socket.handshake.headers.cookie
      ? cookie.parse(socket.handshake.headers.cookie)
      : {};

     
    
    const token = cookies.chatappToken;
          

          if(!token){
               return next(new Error("unauthorized - No Token Provided"));
          }

          //verify the token
          const decoded = jwt.verify(token,process.env.JWT_SECRET);

          if(!decoded){
               return next(new Error("unauthorized - Invalid Token"))
          }

          const user = await userModel.findById(decoded.userId).select("-password");

          if(!user){
               return next(new Error("User not found"));
          }

          socket.user = user;
          socket.userId = user._id.toString();
          next();
          console.log("socket authenticated for user",user._id);

     }catch(err){
          next(new Error("Unauthorized- Authentication failed"))
     }
}