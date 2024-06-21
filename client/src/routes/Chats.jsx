import React, { useState, useEffect } from "react";
import Conversation from "../components/Conversation/Conversation";
import Friends from "../components/Friends/index";
import Sidebar from "../layouts/Sidebar";
import { ChatState } from "../Context/ChatProvider";
import { Categories } from "../components/Conversation/Categories";
import { OurCategoriesProvider } from "../components/Conversation/useOurCategories";

const Chats = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  return (
    <OurCategoriesProvider>
      <div className="h-5/6  w-full flex flex-row gap-4 m-4">
        <div className="w-1/5 rounded-xl shadow-md bg-white hidden lg:flex ml-4 justify-center">
          <Sidebar />
        </div>

        <div className="flex-1  rounded-xl shadow-md bg-white flex">
          <Conversation
            setOpen={setOpen}
          />
          {/* <categories/> */}
          {open && (
            <div className="w-1/4 rounded-xl shadow-md bg-white">
              <Categories
              />
            </div>
          )}
        </div>
        <div className="w-1/5 rounded-xl shadow-md bg-white hidden lg:flex mr-4 justify-center">
          <Friends />
        </div>
      </div>
    </OurCategoriesProvider>
  );
};

export default Chats;
