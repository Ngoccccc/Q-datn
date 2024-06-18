import React, { useEffect } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import { useFriendsContext } from "./useFriendsContext";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";

const FriendList = () => {
  const { friends } = useFriendsContext();

  return (
    <>
      <div className="h-1/2 justify-center pt-3">
        <Typography variant="h5" color="blue-gray">
          Bạn bè
        </Typography>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} className="flex items-center gap-3">
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
