import express from "express";
import { getMessages, sendMessage, sendMessageToMyBot } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/bot", protectRoute, sendMessageToMyBot)

export default router;
