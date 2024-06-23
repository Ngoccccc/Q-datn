import clsx from "clsx";
import { useRef, useEffect, useState } from "react";
import { Badge, Avatar } from "@material-tailwind/react";
import { format } from "date-fns";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation from "../../zustand/useConversation";
import { ChatState } from "../../Context/ChatProvider";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Message from "./Message";

// import { ChatState } from "../../Context/ChatProvider";

const MessageBox = () => {
  const { authUser } = useAuthContext();
  const { myChat } = ChatState();

  const [chatDataId, setChatDataId] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (myChat) {
      setChatDataId(myChat?._id);
    }
  }, [myChat]);
  const { messages, setMessages } = useGetMessages(chatDataId);

  return (
    <>
      <ScrollableFeed>
        {messages &&
          messages.map((m) => {
            return <Message m={m} key={m._id} messages={messages} setMessages={setMessages} />;
          })}
      </ScrollableFeed>
    </>
  );
};

export default MessageBox;
