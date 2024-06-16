import { useEffect } from "react";
import { Sidebar } from "../components/MyBot/Sidebar";
import MessageBox from "../components/MyBot/MessageBox";
import SimpleMentionEditor from "../components/MyBot/SimpleMentionEditor";
import MentionInput from "../components/MyBot/test";
import { MyCategoryProvider } from "../Context/MyCategoryContext";

const MyBot = () => {
  return (
    <MyCategoryProvider>
      <div className="h-5/6 max-w-screen-xl w-full flex flex-row m-4 bg-white rounded-lg">
        <div className="w-1/4 rounded-xl shadow-md  hidden lg:flex">
          <Sidebar />
        </div>

        <div className="flex-1 rounded-xl shadow-md h-full flex flex-col">
          <MessageBox className="flex-1" />

          <div className="mt-auto">
            {/* <SimpleMentionEditor  /> */}
            <MentionInput />
          </div>
        </div>
      </div>
    </MyCategoryProvider>
  );
};

export default MyBot;
