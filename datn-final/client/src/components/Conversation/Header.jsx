import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Badge, Avatar, Typography, Button, Tooltip } from '@material-tailwind/react'
import { toast } from 'react-toastify';
import { ChatState } from '../../Context/ChatProvider';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Header = () => {
    const { user, selectedChat } = ChatState();
    const [loading, setLoading] = useState(false);


    const [sheetId, setSheetId] = useState();

    useEffect(() => {
      // handerCreateFileForMyseft();
      setSheetId(selectedChat?.sheetId);
    }, [sheetId]);

    const usersMail = selectedChat?.users?.map((user) => user.email);



    






    const handerCreateFile = async () => {
        setLoading(true)
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.data.token}`,
              },
            };

            await axios
              .post("/api/chat/createfile", {usersMail, chatId: selectedChat?._id}, config)
              .then((res) => {
                // setLoading(false);
                // toast.success("Tao file thành công !", {
                //   position: "top-center",
                  // });
                  //   console.log(res.data.);
                  setSheetId(res.data.sheetId);
                  setLoading(false);
              })
              .catch((error) => {
                // toast
                console.log(error);
                setLoading(false);
              });

            // toast  
        } catch (error) {
            // toast
        }
    }

    return (
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <NavLink
            to={`/chats`}
            className={
              "lg:hidden block text-blue-gray-600 hover:text-blue-gray-800 transition cursor-pointer"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </NavLink>
          <Badge
            placement="top-end"
            overlap="circular"
            color="green"
            withBorder
          >
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
            />
          </Badge>
          <div className="flex flex-col pr-5">
                    <Typography variant="h6">{selectedChat?.chatName }</Typography>

            <div className="text-sm font-light text-neutral-500">Active</div>
          </div>
          {sheetId ? (
            <Link
              to={sheetId}
              target="_blank"
              className="underline italic font-semibold text-blue-500 cursor-pointer hover:text-blue-700 transition"
            >
              link file quản lý chi tiêu chung
            </Link>
          ) : (
            <Tooltip
              placement="bottom"
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
              content={
                <div className="w-80">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-80"
                  >
                    File chung lưu trữ các thông tin về chi tiêu, kế hoạch chi
                    tiêu của các thành viên trong đoạn chat.
                  </Typography>
                </div>
              }
            >
              <Button color="green" size="sm" onClick={handerCreateFile}>
                <span className="text-sx">Tạo file Google Sheet mới</span>
              </Button>
            </Tooltip>
          )}
          {loading && <span>Loading...</span>}

          {/* link file google sheet nếu có */}
        </div>
        <div className="text-blue-500 cursor-pointer hover:text-blue-gray-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </div>
    );
}

export default Header
