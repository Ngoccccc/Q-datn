import React from 'react'
import Header from './Header'
import MessageBox from './MessageBox'
import MentionInput from './MentionInput'


const Conversation = ({ setOpen }) => {
  return (
    <div className="flex-1 flex flex-col w-full">
      <Header setOpen={setOpen} />
      <MessageBox />
      <div className="mt-auto">
        <MentionInput />
      </div>
    </div>
  );
};

export default Conversation
