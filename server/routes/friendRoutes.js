const express = require("express");

const {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  unFriend,
} = require("../controllers/friendControllers.js");

const router = express.Router();

router.get("/get/:id", getFriends);

router.post("/request", sendFriendRequest);
router.get("/getrequest/:id", getFriendRequests);

router.post("/accept", acceptFriendRequest);
router.post("/unfiend", unFriend);

module.exports = router;
