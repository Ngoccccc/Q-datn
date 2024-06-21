const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const { createCategory, deleteCategory, updateCategory, getAllCategory } = require("../controllers/categoryController");
const {
  createIncome,
  getAllIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.route("/:id").get(protectRoute, getAllIncome);
router.route("/create").post(protectRoute, createIncome);
router.route("/delete/:id").delete(protectRoute, deleteIncome);
router.route("/update").post(protectRoute, updateCategory);

module.exports = router;
