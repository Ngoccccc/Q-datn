import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  IconButton,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Badge,
  Avatar,

} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import UserBox from "../components/UserBox";
import { CreateGroup } from "../components/Group/CreateGroup";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import ChatLoading from "../components/Sketeton/ChatLoading";
import axios from "axios";
import { getSender, getSenderFull } from "../components/config/ChatLogics";

function Sidebar({ fetchAgain }) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);

  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const handleOpen = () => setOpen(!open);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);



  return (
    <div className="h-full flex flex-col">
      <div className="h-1/6 flex items-center gap-4 pl-4 pr-4 justify-between">
        <Typography variant="h5" color="blue-gray">
          Đoạn chat
        </Typography>
        {/* <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button> */}
        <CreateGroup />

      </div>
      <div className=" pl-4 pr-4 flex flex-col">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
        <hr className="mt-2 my-2 border-blue-gray-50" />
      </div>

      {chats ? (
        <div className="flex-1 overflow-y-auto pl-4 pr-4">
          {chats.map((chat) => (
            // <Box
            //   onClick={() => setSelectedChat(chat)}
            //   cursor="pointer"
            //   bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
            //   color={selectedChat === chat ? "white" : "black"}
            //   px={3}
            //   py={2}
            //   borderRadius="lg"
            //   key={chat._id}
            // >
            //   <Text>
            //     {!chat.isGroupChat
            //       ? getSender(loggedUser, chat.users)
            //       : chat.chatName}
            //   </Text>
            //   {chat.latestMessage && (
            //     <Text fontSize="xs">
            //       <b>{chat.latestMessage.sender.name} : </b>
            //       {chat.latestMessage.content.length > 50
            //         ? chat.latestMessage.content.substring(0, 51) + "..."
            //         : chat.latestMessage.content}
            //     </Text>
            //   )}
            // </Box>

            <ListItem key={chat._id}
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"

            >
              <ListItemPrefix>
                <div className="flex items-center gap-4">
                  <Badge placement="top-end" overlap="circular" color="green" withBorder>
                    <Avatar
                      // src={getSenderFull(loggedUser, chat.users)?.pic}
                      alt="avatar"
                    />
                  </Badge>
                  <div>
                    <Typography variant="h6">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Typography>
                    {chat.latestMessage && (
                      <Typography variant="small" color="gray" className="font-normal">
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Typography>
                    )}
                  </div>
                </div>
              </ListItemPrefix>
            </ListItem>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pl-4 pr-4">
          <ChatLoading />
        </div>
      )}


    </div>

  );
}

export default Sidebar