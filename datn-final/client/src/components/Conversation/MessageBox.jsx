import clsx from "clsx";
import { useRef, useEffect } from "react";
import { Badge, Avatar } from "@material-tailwind/react";
import { format } from "date-fns";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

import { ChatState } from "../../Context/ChatProvider";

const MessageBox = ({ messages }) => {

  const { selectedChat } = ChatState();

  const isOwn = true;
  const image = false;
  const isLast = true;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end ");

  const avatar = clsx(isOwn && "order-2 ");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-blue-600 text-white" : "bg-gray-100",
    image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <>
      {selectedChat ?  <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className={container} key={m._id}>
            <div className={avatar}>
              <Badge
                placement="top-end"
                overlap="circular"
                color="green"
                withBorder
              >
                <Avatar size="sm" src={m.sender.pic} alt="avatar" />
              </Badge>
            </div>

            <div className={body}>
              <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500">{m.sender.name}</div>
                <div className="text-xs text-gray-400">
                  {format(new Date(), "p")}
                </div>
              </div>
              <div className={message}>{m.content}</div>
              {isLast && (
                <div className="text-xs font-light text-gray-500">
                  Seen by Quynh
                </div>
              )}
            </div>
          </div>
        ))}

    </ScrollableFeed>:<div className="h-3/4">Chọn một đoạn chat để bắt đầu chat</div>}
   
    </>
  );
};

export default MessageBox;
