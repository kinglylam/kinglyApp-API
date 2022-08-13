import express from "express";
import { loginUser, registeruser } from "../controllers/AuthController.js";

const router =express.Router();

router.post('/register', registeruser)
router.post('/login', loginUser)
export default router;