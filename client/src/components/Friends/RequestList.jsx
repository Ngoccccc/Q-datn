import React, { useState, useEffect } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useFriendsContext } from "./useFriendsContext";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const { authUser } = useAuthContext();
  const { friends, setFriends } = useFriendsContext();

  useEffect(() => {
    if (!authUser) return;
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios
        .get(`/api/friend/getrequest/${authUser._id}`, config)
        .then((response) => {
          setRequests(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [friends]);

  const handleAcceptRequest = async (requestId) => {
    const accepterId = authUser._id;
    const userId = requestId;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .post(`/api/friend/accept`, {
        userId,
        accepterId,
      }, config)
      .then((response) => {
        console.log(response.data);
        setFriends(response.data.friends);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="h-1/2 justify-center pt-3">
        <Typography variant="h5" color="blue-gray">
          Lời mời kết bạn
        </Typography>
        <div className="overflow-y-auto">
          {requests && requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="flex items-center gap-3 p-2">
                <Avatar src={request.avatar} className="w-10 h-10" />
                <Typography className="ml-2">{request.username}</Typography>
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="ml-2 text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Đồng ý
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500 pt-3">Không có lời mời kết bạn</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestList;
