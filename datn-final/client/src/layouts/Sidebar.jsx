import { useState, useEffect } from "react";
import {
  Typography,
  ListItem,
  ListItemPrefix,
  Input,
  Badge,
  Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateGroup } from "../components/Group/CreateGroup";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import ChatLoading from "../components/Sketeton/ChatLoading";
import axios from "axios";
import { getSender, getChatAvatar } from "../components/config/ChatLogics";

function Sidebar({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
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

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      // setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      // setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetSearchResult = async (selectedUser) => {
    setSearch("");
    setSearchResult([]);
    const userId = selectedUser._id;
     try {
      // setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      // setLoadingChat(false);
      // onClose();
    } catch (error) {
      console.log(error);
    }
   }


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
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Tìm kiếm"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <hr className="mt-2 my-2 border-blue-gray-50" />
      </div>
      {searchResult.length > 0 && (
        <div className="flex-1 overflow-y-auto pl-4 pr-4">
          {searchResult.map((user) => (
            <ListItem
              key={user._id}
              onClick={() => handleSetSearchResult(user)}
              cursor="pointer"
            >
              <ListItemPrefix>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={user.pic}
                    alt="avatar"
                  />
                  <div>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {`${user.email.substring(0, 15)}...`}
                    </Typography>
                  </div>
                </div>
              </ListItemPrefix>
            </ListItem>
          ))}
        </div>
      )}

      {chats ? (
        <div className="flex-1 overflow-y-auto pl-4 pr-4">
          {chats.map((chat) => (
            <ListItem
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
            >
              <ListItemPrefix>
                <div className="flex items-center gap-4">
                  <Badge
                    placement="top-end"
                    overlap="circular"
                    color="green"
                    withBorder
                  >
                    {console.log(chat)}
                    <Avatar
                      src={getChatAvatar(loggedUser, chat.users)}
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
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
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
};

export default Sidebar;
