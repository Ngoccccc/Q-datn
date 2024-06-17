import React from 'react'
import Conversation from '../components/Conversation/Conversation'
import Sidebar from '../layouts/Sidebar'

const Chats = () => {
  return (
    <div className="h-5/6  w-full flex flex-row gap-4 m-4">
      <div className="w-1/5 rounded-xl shadow-md bg-white hidden lg:flex ml-4 justify-center">
        <Sidebar />
      </div>

      <div className="flex-1  rounded-xl shadow-md bg-white">
        <Conversation className="flex-1" />
      </div>
    </div>
  );
}

export default Chats
