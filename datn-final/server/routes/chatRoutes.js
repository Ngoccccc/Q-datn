const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  createSheet,
  mySelfChat,
  getSpending,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/myself/:id").get(protectRoute, mySelfChat);
router.route("/createfile").post(protectRoute, createSheet);
router.route("/spending/:id").get(protectRoute, getSpending);

// router.route("/group").post(protect, createGroupChat);
router.route("/group").post(createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
