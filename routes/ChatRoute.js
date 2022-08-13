import express from "express";
import {
  createChat,
  findChat,
  userchats,
} from "../controllers/ChatController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userchats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
