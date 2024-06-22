import { useState, useEffect } from "react";
import {
  Typography,
  ListItem,
  ListItemPrefix,
  Input,
  Badge,
  Avatar,
} from "@material-tailwind/react";
import FriendList from "./FriendList";
import RequestList from "./RequestList";
import { FriendsProvider } from "./useFriendsContext";
import { ChatState } from "../../Context/ChatProvider";

function Friends() {
  const { selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    if (selectedChat) {
      setSelectedChat(null);
    }
  }, []);

  return (
    <FriendsProvider>
      <div className="h-full flex flex-col">
        <FriendList />

        <RequestList />
      </div>
    </FriendsProvider>
  );
}

export default Friends;
