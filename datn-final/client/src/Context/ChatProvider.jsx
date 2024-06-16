import { createContext, useContext, useEffect, useState } from "react";
import useGetMySelfChat from "../hooks/useGetMySelfChat";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [myChat, setMyChat] = useState();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getDataMyChat = async () => {
      
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios
        .get(`/api/chat/myself/${authUser._id}`, config)
        .then((res) => {
          setMyChat(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDataMyChat();
  }, []);

  



  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        myChat,
        setMyChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
