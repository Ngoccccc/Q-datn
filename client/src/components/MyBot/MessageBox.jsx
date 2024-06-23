import { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import useConversation from "../../zustand/useConversation";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import Message from "./Message";
import { toast } from "react-toastify";


const MessageBox = () => {
  const { myChat } = ChatState();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      // setLoading(true);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/message/${myChat?._id}`,
          config
        );

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        // setLoading(false);
      }
    };

    if (myChat?._id) getMessages();
  }, [myChat]);

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
