import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../setupAxios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `${apiUrl}/api/message/${selectedConversation?._id}`,
          config
        );

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading, setMessages };
};
export default useGetMessages;
