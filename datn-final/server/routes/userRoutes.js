const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  createSheet,
  getUser,
  getSheetLinkOfUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// todo sửa protect
// router.route("/").get(protect, allUsers);
router.route("/:id").get( allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/createfile", createSheet);
router.get("/:id", getUser);
router.get("/sheet/:id", getSheetLinkOfUser);

module.exports = router;
