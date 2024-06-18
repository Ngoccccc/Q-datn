import React, { useEffect } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import { useFriendsContext } from "./useFriendsContext";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";

const FriendList = () => {
  const { friends } = useFriendsContext();
  const { authUser } = useAuthContext();
  const { selected, setSelectedChat} = ChatState()
  

  const handleSelectedChat = async (friend) => {
    if (!authUser) return;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios
      .post(`/api/chat`,{myId: authUser._id, userId: friend._id} ,config) 
      .then((response) => {
        setSelectedChat(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
      
    }


  return (
    <>
      <div className="h-1/2 justify-center pt-3">
        <Typography variant="h5" color="blue-gray">
          Bạn bè
        </Typography>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div onClick={() => handleSelectedChat(friend)} key={friend._id} className="flex items-center gap-3 p-2 hover:bg-blue-gray-50 rounded-lg">
              <Avatar src={friend.avatar} alt="avatar" className="w-10 h-10" />
              <Typography className="ml-2">{friend.username}</Typography>
            </div>
          ))
        ) : (
          <span className="text-gray-500 pt-3">Chưa có bạn bè</span>
        )}
      </div>
    </>
  );
};

export default FriendList;
