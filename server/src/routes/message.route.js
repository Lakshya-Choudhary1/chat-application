import express from "express";
import {getAllContacts,getMessagesByUserId,sendMessage,getChatPartners} from "../controllers/message.controller.js"
import { verifyUser } from "../middleware/verifyToken.js";
const messageRouter = express.Router();

messageRouter.get("/contacts",verifyUser,getAllContacts);
messageRouter.get("/chatPartners",verifyUser,getChatPartners);
messageRouter.get("/:id",verifyUser,getMessagesByUserId);
messageRouter.post("/send/:id",verifyUser,sendMessage);

export default messageRouter;