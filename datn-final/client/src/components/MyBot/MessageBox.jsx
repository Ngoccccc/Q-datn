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

  const [chatDataId, setChatDataId] = useState(null);

   useEffect(() => {
     const config = {
       headers: {
         "Content-type": "application/json",
       },
     };
     axios
       .get(`/api/chat/myself/${authUser._id}`, config)
       .then((res) => {
         setChatDataId(res.data[0]._id);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
  

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
              const mentions = m.mentions;
              const content = m.content;

              mentions.forEach((mention, index) => {
                // Push the text before the mention
                if (mention.start > currentIndex) {
                  parts.push(content.slice(currentIndex, mention.start));
                }
                // Push the mention itself
                parts.push(
                  <span key={index} className="text-blue-600">
                    @{mention.name}
                  </span>
                );
                // Update currentIndex to the end of the mention
                currentIndex = mention.end;
              });

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
                        authUser?._id == m.sender._id
                          ? messageNotOwn
                          : messageOwn
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
