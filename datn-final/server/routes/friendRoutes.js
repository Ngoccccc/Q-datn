const express = require("express");

const {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
} = require("../controllers/friendControllers.js");

const router = express.Router();

router.get("/get/:id", getFriends);

router.post("/request", sendFriendRequest);
router.get("/getrequest/:id", getFriendRequests);

router.post("/accept", acceptFriendRequest);

module.exports = router;
