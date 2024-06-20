const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const {
  convertStringToNumber,
  writeGGSheet,
} = require("../googleSheet/googleSheetHandler");
const Mention = require("../models/mentionModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username avatar email")
      .populate("chat")
      .populate("mention")
      .populate("category");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { mention, category, content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(405);
  }

  var newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
    mention: mention ? mention : {},
    category: category ? category : {},
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "username avatar");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "username avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    message = await message.populate("mention category");
    res.json(message);

    const chat = await Chat.findById(req.body.chatId);
    // ghi vào file
    if (mention) {
      const sliceRemainingData = content.slice(
        mention.position,
        category.value.length + category.position + 1
      );
      const remainingData = content.replace(sliceRemainingData, "").trim();
      // await writeGGSheet(
      //   mention.value,
      //   category.value,
      //   remainingData,
      //   chat.sheetId
      // );

      // Sau 5 phút, lưu tin nhắn vào Google Sheets
      setTimeout(async () => {
        await writeGGSheet(
          mention.value,
          category.value,
          remainingData,
          chat.sheetId
        )
          .then(() => {
            console.log("ghi file thanh cong");
          })
          .catch((error) => {
            console.log(error);
          });
      }, 300000); // 5 phút = 300000 milliseconds

      // }
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    const currentTime = new Date();
    const timeDifference = (currentTime - message.createdAt) / 1000 / 60; // Thời gian chênh lệch tính bằng phút

    if (timeDifference > 5) {
      return res.status(403).json({
        msg: "You can only delete messages within 5 minutes of sending",
      });
    }

    await message.remove();
    res.status(200).json({ msg: "Message deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

const updateMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const { content, mention, category } = req.body;

  console.log("updateMessage: ", messageId, content, mention, category);

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    const currentTime = new Date();
    const timeDifference = (currentTime - message.createdAt) / 1000 / 60; // Thời gian chênh lệch tính bằng phút

    if (timeDifference > 5) {
      return res.status(403).json({
        msg: "You can only edit messages within 5 minutes of sending",
      });
    }

    message.content = content;
    message.mention = mention;
    message.category = category;
    await message.save();
    res.status(200).json({ msg: "Message updated", message });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = { allMessages, sendMessage, deleteMessage, updateMessage };
