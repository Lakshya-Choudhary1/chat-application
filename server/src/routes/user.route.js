import express from "express";
import {login, signup, logout, checkAuth,updateProfile} from "../controllers/user.controller.js"
import { verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.put('/update-profile',verifyUser,updateProfile);
router.get('/check-auth',verifyUser,checkAuth);

export default router;