import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  List,
  Accordion,
  ListItemPrefix,
  InboxIcon,
} from "@material-tailwind/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";
import { useOurCategoriesContext } from "./useOurCategories";

export const Categories = () => {
  const {selectedChat} = ChatState();
  const { ourCategories, setOurCategories, ourIncomes, setOurIncomes } =
    useOurCategoriesContext();
  const [visableClick, setVisableClick] = useState(true);
  const [categoryName, setCategoryName] = useState();
  const [incomeName, setIncomeName] = useState();


  useEffect(() => {
    if (selectedChat) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .get(`/api/category/${selectedChat?._id}`, config)
        .then((res) => {
          setOurCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
      
      axios
        .get(`/api/income/${selectedChat?._id}`, config)
        .then((res) => {
          setOurIncomes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
      
      
      
    }
  }, [selectedChat]);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    setVisableClick(false);
    if (categoryName) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post(
          `/api/category/create`,
          { name: categoryName, chatId: selectedChat?._id },
          config
        )
        .then((res) => {
          setOurCategories([res.data, ...ourCategories]);
          setVisableClick(true);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setVisableClick(true);
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
        setOurCategories(ourCategories.filter((item) => item._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  const handleCreateIncome = (e) => {
    e.preventDefault();
    if (incomeName) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post(
          `/api/income/create`,
          { name: incomeName, chatId: selectedChat?._id },
          config
        )
        .then((res) => {
          setOurIncomes([res.data, ...ourIncomes]);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
    setIncomeName("");
  };

  const handleDeleteIncome = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .delete(`/api/income/delete/${id}`, config)
      .then((res) => {
        setOurIncomes(ourIncomes.filter((item) => item._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col justify-between items-center">
      <Typography className="pt-2" variant="h6">
        Các hạng mục quản lý
      </Typography>
      <div className="flex flex-row">
        <Input
          variant="static"
          placeholder="Thêm danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          onClick={(e) => {
            visableClick && handleCreateCategory(e);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={
              visableClick ? "size-6 text-green-700" : "size-6 text-green-100"
            }
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
        {ourCategories.length > 0 &&
          ourCategories.map((category) => (
            //   <span key={category._id}>{category.name}</span>
            <div
              key={category._id}
              className="flex flex-row items-center h-10  px-3 rounded-lg"
            >
              <div className="flex-grow">{category.name}</div>

              <button
                className="text-red-500 ml-auto"
                onClick={() => handleDeleteCategory(category._id)}
              >
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
      </List>

      {/* income */}
      <div className="flex flex-row justify-between items-center mt-3">
        <Typography variant="h6">Các loại thu nhập</Typography>
      </div>
      <div className="mb-2 flex flex-row">
        <Input
          variant="static"
          placeholder="Thêm loại thu nhập"
          value={incomeName}
          onChange={(e) => setIncomeName(e.target.value)}
        />
        <button
          onClick={(e) => {
            handleCreateIncome(e);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={
              visableClick ? "size-6 text-green-700" : "size-6 text-green-100"
            }
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
          {ourIncomes.map((income) => (
            <div
              key={income._id}
              className="flex flex-row items-center h-10  px-3 rounded-lg"
            >

              <div className="flex-grow">{income.name}</div>

              <button
                className="text-red-500 ml-auto"
                onClick={() => handleDeleteIncome(income._id)}
              >
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
    </div>
  );
};
