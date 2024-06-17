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

// import { ChatState } from "../../Context/ChatProvider";

const MessageBox = () => {
  const { authUser } = useAuthContext();
  const { myChat } = ChatState();

  const [chatDataId, setChatDataId] = useState(null);

  useEffect(() => {
    if (myChat) {
      setChatDataId(myChat?._id);
    }
  }, [myChat]);
  const { messages } = useGetMessages(chatDataId);


  const [isOwn, setIsOwn] = useState(false);
  const image = false;
  const isLast = true;

  const container = clsx("flex gap-3 p-4 justify-start ");
  // const container = clsx("flex gap-3 p-4");

  const avatar = clsx(isOwn && "order-2 ");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageOwn = clsx(
    "text-sm w-fit overflow-hidden",
    "bg-blue-100 text-gray",
    image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  const messageNotOwn = clsx(
    "text-sm w-fit overflow-hidden",
    "bg-gray-100",
    image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <>
      <ScrollableFeed>
        {messages &&
          messages.map((m) => {
            const parts = [];
            let currentIndex = 0;
            const mention = m.mention;
            const content = m.content;
            const category = m.category;

            if (mention) {
              if (mention.position > currentIndex) {
                parts.push(content.slice(currentIndex, mention.position));
              }

              parts.push(
                <span className="text-blue-600">@{mention.value}</span>
              );
              currentIndex = mention.position + mention.value.length + 1; // Update currentIndex correctly
            }

            if (category) {
              if (category.position > currentIndex) {
                parts.push(content.slice(currentIndex, category.position));
              }
              parts.push(
                <span className="text-gray-600 font-bold bg-blue-gray-100 rounded-full p-1 px-2 mx-2">
                  /{category.value}
                </span>
              );
              currentIndex = category.position + category.value.length + 1; // Update currentIndex correctly
            }

            // Push any remaining text after the last mention
            if (currentIndex < content.length) {
              parts.push(content.slice(currentIndex));
            }


            return (
              <div className={container} key={m._id}>
                <div className={avatar}>
                  <Badge
                    placement="top-end"
                    overlap="circular"
                    color="green"
                    withBorder
                  >
                    <Avatar size="sm" src={m.sender.avatar} alt="avatar" />
                  </Badge>
                </div>

                <div className={body}>
                  <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                      {m.sender.username}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(m.createdAt), "yyyy-MM-dd HH:mm")}
                    </div>
                  </div>
                  <p
                    className={
                      authUser?._id == m.sender._id ? messageNotOwn : messageOwn
                    }
                  >
                    {parts}
                  </p>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </>
  );
};

export default MessageBox;
