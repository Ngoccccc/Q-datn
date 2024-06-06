const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { createNewSheet } = require("../googleSheet/googleSheetHandler")

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const key = req.query.search
  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         { name: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } },
  //       ],
  //     }
  //   : {};

  // const users = await User.find(key).find({ _id: { $ne: req.user._id } });
  const users = await User.find({ name: { $regex: key, $options: 'i' } });
  res.send(users);
});

//@description     create new file sheet for myself
//@route           POST /api/user/createfile
//@access          Public
const createSheet = asyncHandler(async (req, res) => {
  console.log(req.body.email);
  const sheetId = await createNewSheet(req.body.email);
  res.send(sheetId);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // tao sheet moi cho ca nhan user
  // const sheetId = await createNewSheet(email);

  const user = await User.create({
    name,
    email,
    password,
    pic,
    // sheetId
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser, createSheet };
