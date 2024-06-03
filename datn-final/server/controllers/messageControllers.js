const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const {convertStringToNumber} = require("../googleSheet/googleSheetHandler")

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
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
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic")
    message = await message.populate("chat");


    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    // console.log(message)


    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessageToBot = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { messages, chatId } = req.body;

  // check cú pháp đúng chưa
  messages.map(async (message) => {
    const keywords = ['chi tiêu', 'thu nhập', 'lập kế hoạch'];
    const messageHandledSpace = message.replace(/\s+/g, ' ') // loại bỏ khoảng trống thừa
    const pattern = new RegExp(`(\\b(?:${keywords.join('|')})\\b)`, 'gi');
    // pattern = pattern.filter(element => element !== ''); // loại bỏ ''
    const segments = messageHandledSpace.split(pattern);

    var message = ""
    var format = "@chi tiêu/Lập kế hoạch/Thu nhập [tên chi tiêu/kế hoạch/thu nhập]:[số tiền]"

    const type = segments[1]
    var [item, money] = segments[2].split(/ ?: ?/);

    if (item == "" || money == "" || !item || !money) {
      message = "Cú pháp không đúng định dạng. "
      res.json(message)
      return;

    }

    money = convertStringToNumber(money)
    


  })


    // money = convertStringToNumber(money)

    // mở file sheet
    // const file = new GoogleSpreadsheet("1Zqvtd0Usx6bqkEOOsZb26h-bDMMhpqxuwJjwMUKIFf0", jwt);
    // await file.loadInfo();
    // var sheet = file.sheetsByIndex[2];
    // if (type == "Chi tiêu") {
    //   sheet = file.sheetsByIndex[2];
    // }
    // else if (type == "Lập kế hoạch") {
    //   sheet = file.sheetsByIndex[3];
    // }
    // else if (type == "Thu nhập") {
    //   sheet = file.sheetsByIndex[4];
    // }
    // else {
    //   sheet = file.sheetsByIndex[5];
    // }

    // const timeDayMonthYear = getTime();

    // await sheet.addRow({
    //   "Thời gian": timeDayMonthYear,
    //   "Loại thu nhập": item,
    //   "Số tiền": money,
    // });

  // })

  // if (!content || !chatId) {
  //   console.log("Invalid data passed into request");
  //   return res.sendStatus(400);
  // }

  // var newMessage = {
  //   sender: req.user._id,
  //   content: content,
  //   chat: chatId,
  // };

//   try {
//     // var message = await Message.create(newMessage);
//     // message = await message.populate("sender", "name pic")
//     // message = await message.populate("chat");


//     // message = await User.populate(message, {
//     //   path: "chat.users",
//     //   select: "name pic email",
//     // });
//     console.log("message")


//     // await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

//     // res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }

})

module.exports = { allMessages, sendMessage, sendMessageToBot };
