const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const friendshipSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, default: false },
  },
  { timestaps: true }
);


const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
