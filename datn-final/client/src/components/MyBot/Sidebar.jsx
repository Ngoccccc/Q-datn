import React, { useEffect, useState } from "react";
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
  Button,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import useCreateFile from "../../hooks/useCreateFile";
import { useAuthContext } from "../../Context/AuthContext";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";

export function Sidebar() {
  const { myChat } = ChatState();
  const [fileLink, setFileLink] = useState(myChat?.sheetId);
  const { loading, createFile } = useCreateFile();
  const [categoryName, setCategoryName] = useState();
  const [categories, setCategories] = useState([]);
  const [isEditing , setIsEditing] = useState(false)

  useEffect(() => {
    if (myChat) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .get(`/api/category/${myChat?._id}`, config)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myChat]);

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };

  const handerCreateFile = async () => {
    await createFile({ chatId: myChat?.id, setFileLink });
  };

  if (!myChat) {
    return <div>Loading...</div>;
  }

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (categoryName) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post(
          `/api/category/create`,
          { name: categoryName, chatId: myChat?._id },
          config
        )
        .then((res) => {
          setCategories([res.data, ...categories]);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    setCategoryName("");
  };

  const handleDeleteCategory = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .delete(`/api/category/delete/${id}`, config)
      .then((res) => {
        setCategories(categories.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        {fileLink !== "" ? (
          <Link
            to={fileLink}
            target="_blank"
            className="underline italic font-semibold text-blue-500 cursor-pointer hover:text-blue-700 transition"
          >
            link file quản lý chi tiêu
          </Link>
        ) : (
          <Button
            variant="gradient"
            color="green"
            onClick={handerCreateFile}
            loading={loading}
          >
            <span className="text-sx">Tạo file quản lý cá nhân</span>
          </Button>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6">Các danh mục quản lý</Typography>

      </div>
      <div className="mb-2 p-4 pr-6 w-10 flex flex-row">
        <Input
          variant="static"
          placeholder="Thêm danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={(e) => handleCreateCategory(e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <List className="flex-1 overflow-y-auto pl-4 pr-4 ">
        <Accordion>
          {categories.map((category) => (
            <div  key={category._id} className="flex flex-row items-center h-10  px-3 rounded-lg">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>

              <div className="flex-grow" onClick={() => setIsEditing(true)}>{category.name}</div>
              
              <button className="text-red-500 ml-auto" onClick={() => handleDeleteCategory(category._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </Accordion>
      </List>
    </Card>
  );
}
