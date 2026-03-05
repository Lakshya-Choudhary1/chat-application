import express from "express";
import userRouter from "./user.route.js";
import messageRouter from "./message.route.js";

const router = express.Router();

//authentication routes
router.use('/user',userRouter)

//messages routes
router.use('/message',messageRouter);

export default router;