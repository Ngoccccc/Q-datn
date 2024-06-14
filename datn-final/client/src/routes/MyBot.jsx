import { useEffect, useState } from "react";
import { Sidebar } from "../components/MyBot/Sidebar";
import MessageBox from "../components/MyBot/MessageBox";
import SimpleMentionEditor from "../components/MyBot/SimpleMentionEditor";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const MyBot = () => {
  const { user } = ChatState();
  const [mySelfChatId, setMySelfChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMySelfChat = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        const { data } = await axios.get("/api/chat/myself", config);
        const chat = data[0];
        setMySelfChatId(chat._id);
      } catch (error) {
        console.error("Error fetching self chat:", error);
      }
    };

    fetchMySelfChat();
  }, [user.data.token]);

  useEffect(() => {
    const fetchMessages = async (chatId) => {
      if (!chatId) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        const { data } = await axios.get(`/api/message/${chatId}`, config);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(mySelfChatId);
  }, [mySelfChatId, user.data.token]);




  return (
    <div className="h-5/6 max-w-screen-xl w-full flex flex-row m-4 bg-white rounded-lg">
      <div className="w-1/4 rounded-xl shadow-md  hidden lg:flex">
        <Sidebar mySelfChatId={mySelfChatId} />
      </div>

      <div className="flex-1 rounded-xl shadow-md h-full flex flex-col">
        <MessageBox className="flex-1" messages={messages} />
        <div className="mt-auto">
          <SimpleMentionEditor mySelfChatId={mySelfChatId} messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default MyBot;
