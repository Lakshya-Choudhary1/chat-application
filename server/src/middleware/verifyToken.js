import "dotenv/config";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const tokenName = process.env.JWT_TOKEN_NAME;
    const token = req.cookies?.[tokenName];
    console.log(tokenName)
     console.log(req.cookies)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
   
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};