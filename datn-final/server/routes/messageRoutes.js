const express = require("express");
const {
  allMessages,
  sendMessage,
  sendMessageToBot
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

router.route("/:chatId").get(protectRoute, allMessages);
router.route("/").post(protectRoute, sendMessage);
router.route("/bot").post(protect, sendMessageToBot);

module.exports = router;
