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
    // console.log("ok");

    const chat = await Chat.findById(req.body.chatId);
    // ghi vào file
    if (mention) {
      const sliceRemainingData = content.slice(
        mention.position,
        category.value.length + category.position + 1
      );
      const remainingData = content.replace(sliceRemainingData, "").trim();
      // if (mentions.length > 0) {
      await writeGGSheet(mention.value, category.value, remainingData, chat.sheetId).then(() => {
        
      }).catch((error) => {
        console.log(error);
      });
      // }
    }

    res.json(message);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const sendMessageToBot = asyncHandler(async (req, res) => {
  const { messages, chatId } = req.body;

  // check cú pháp đúng chưa
  messages.map(async (message) => {
    const keywords = ["chi tiêu", "thu nhập", "lập kế hoạch"];
    const messageHandledSpace = message.replace(/\s+/g, " "); // loại bỏ khoảng trống thừa
    const pattern = new RegExp(`(\\b(?:${keywords.join("|")})\\b)`, "gi");
    // pattern = pattern.filter(element => element !== ''); // loại bỏ ''
    const segments = messageHandledSpace.split(pattern);

    var message = "";
    var format =
      "@chi tiêu/Lập kế hoạch/Thu nhập [tên chi tiêu/kế hoạch/thu nhập]:[số tiền]";

    const type = segments[1];
    var [item, money] = segments[2].split(/ ?: ?/);

    if (item == "" || money == "" || !item || !money) {
      message = "Cú pháp không đúng định dạng. ";
      res.json(message);
      return;
    }

    money = convertStringToNumber(money);
  });
});

module.exports = { allMessages, sendMessage, sendMessageToBot };
