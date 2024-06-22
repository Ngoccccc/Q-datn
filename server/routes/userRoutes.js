const express = require("express");
const { allUsers, updateUser } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();


router.route("/:id").get(allUsers);
router.post("/update", updateUser);

module.exports = router;
