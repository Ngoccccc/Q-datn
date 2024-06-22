const express = require("express");

const {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  unFriend,
  cancelFriendRequest,
} = require("../controllers/friendControllers.js");

const router = express.Router();

router.get("/get/:id", getFriends);

router.post("/request", sendFriendRequest);
router.get("/getrequest/:id", getFriendRequests);

router.post("/accept", acceptFriendRequest);
router.post("/unfiend", unFriend);
router.post("/cancelFriendRequest", cancelFriendRequest);

module.exports = router;
