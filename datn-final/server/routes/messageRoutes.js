const express = require("express");
const {
  allMessages,
  sendMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

router.route("/:chatId").get(protectRoute, allMessages);
router.route("/").post(protectRoute, sendMessage);
router.delete("/delete/:messageId", deleteMessage);
router.put("/update/:messageId", updateMessage);

module.exports = router;
