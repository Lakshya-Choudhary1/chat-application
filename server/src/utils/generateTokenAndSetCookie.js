import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (res,userId) => {
     const token = jwt.sign({userId},process.env.JWT_SECRET ,{
          expiresIn : '7d'
     });

     res.cookie(process.env.JWT_TOKEN_NAME,token,{
          httpOnly: true, //cookie cannot be accessed from client side js
          secure: process.env.NODE_ENV === "production",//https
          maxAge: 7*24*60*60*1000,
          sameSite:"lax",
          path:"/"
     })

     return token;
}

export default generateTokenAndSetCookie;