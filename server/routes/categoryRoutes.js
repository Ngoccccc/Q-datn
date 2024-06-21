const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const { createCategory, deleteCategory, updateCategory, getAllCategory } = require("../controllers/categoryController");

const router = express.Router();

router.route("/:id").get(protectRoute, getAllCategory);
router.route("/create").post(protectRoute, createCategory);
router.route("/delete/:id").delete(protectRoute, deleteCategory);
router.route("/update").post(protectRoute, updateCategory);

module.exports = router;
