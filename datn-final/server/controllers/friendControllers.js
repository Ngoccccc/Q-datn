const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Friendship = require("../models/friendshipModel");
const {
  createNewSheet,
  createNewSheetForGroup,
  readTotalSpending,
} = require("../googleSheet/googleSheetHandler");

const getFriends = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate(
      "friends",
      "username avatar"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { authId, userId } = req.body;

  if (authId === userId) {
    return res
      .status(400)
      .json({ msg: "You cannot send friend request to yourself" });
  }

  try {
    // Kiểm tra xem yêu cầu đã tồn tại chưa
    let friendship = await Friendship.findOne({
      $or: [
        { user1_id: authId, user2_id: userId },
        { user1_id: userId, user2_id: authId },
      ],
    });

    if (friendship) {
      return res.status(400).json({ msg: "Friend request already sent" });
    }

    // Tạo yêu cầu kết bạn mới
    friendship = new Friendship({ user1_id: authId, user2_id: userId });
    await friendship.save();

    // Cập nhật yêu cầu kết bạn cho người dùng đích
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { friend_requests: authId } },
        { new: true } // Tùy chọn này trả về tài liệu đã được cập nhật
      );
    } catch (error) {
      res.status(201).json({ msg: "Failed" });
    }

    res.status(201).json({ msg: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { userId, accepterId } = req.body; // userId là ID của người gửi yêu cầu kết bạn
  console.log(userId, accepterId);
  try {
    // Tìm yêu cầu kết bạn và cập nhật trạng thái
    const friendship = await Friendship.findOneAndUpdate(
      { user1_id: userId, user2_id: accepterId, status: false },
      { status: true },
      { new: true }
    );

    
    if (!friendship) {
      return res
        .status(400)
        .json({ msg: "Friend request not found or already accepted" });
    }

    // Cập nhật danh sách bạn bè của cả hai người dùng
    await User.findByIdAndUpdate(accepterId, {
      $push: { friends: userId },
      $pull: { friend_requests: userId },
    });
    await User.findByIdAndUpdate(userId, { $push: { friends: accepterId } });

    res.status(200).json({ msg: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

const getFriendRequests = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate(
      "friend_requests",
      "username avatar"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Lấy danh sách yêu cầu kết bạn và trả về với id, username, avatar
    const friendRequests = user.friend_requests.map((request) => ({
      id: request._id,
      username: request.username,
      avatar: request.avatar,
    }));

    console.log(friendRequests);
    res.json(friendRequests);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
};
