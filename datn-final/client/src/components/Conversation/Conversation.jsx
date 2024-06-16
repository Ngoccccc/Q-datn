import { useState, useEffect } from "react";
import Header from "./Header";
import InputMessage from "./MessageInput";
import MessageBox from "./MessageBox";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import SimpleMentionEditor from "../Mention/SimpleMentionEditor";
import { Typography } from "@material-tailwind/react";

const Conversation = () => {
  // const [messages, setMessages] = useState([]);

  // const { selectedChat, setSelectedChat, user, notification, setNotification } =
  //   ChatState();

  // const fetchMessages = async () => {
  //   if (!selectedChat) return;

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user?.data.token}`,
  //       },
  //     };

  //     // setLoading(true);

  //     const { data } = await axios.get(
  //       `/api/message/${selectedChat._id}`,
  //       config
  //     );
  //     setMessages(data);
  //     console.log(data);
  //     // setLoading(false);

  //     // socket.emit("join chat", selectedChat._id);
  //   } catch (error) {
  //     console.log(error);
  //     // toast({
  //     //   title: "Error Occured!",
  //     //   description: "Failed to Load the Messages",
  //     //   status: "error",
  //     //   duration: 5000,
  //     //   isClosable: true,
  //     //   position: "bottom",
  //     // });
  //   }
  // };

  // useEffect(() => {
  //   fetchMessages();

  //   // selectedChatCompare = selectedChat;
  //   // eslint-disable-next-line
  // }, [selectedChat]);
  

  return (
    <div className="h-full flex flex-col">

      {/* {selectedChat ? (
        <div className="h-5/6">
          {" "}
          <Header className="sticky top-0 h-1/6" />
          <MessageBox messages={messages} />
          <SimpleMentionEditor className="bottom-0" messages={messages} setMessages={setMessages} />
        </div>
      ) : (
          // TODO: mybot
        <div className="h-5/6 flex justify-center items-center w-full">
          <Typography className="text-3xl text-blue-gray-100">Chọn 1 đoạn chat để bắt đầu chat</Typography>
        </div>
      )} */}
    </div>
  );
};

export default Conversation;
