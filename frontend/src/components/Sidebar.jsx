import React from 'react';
import Conversation from './Conversation.jsx';
import Header from './Header.jsx';
import MessageContainer from './messages/MessageContainer.jsx';
import MessageInput from './messages/MessageInput.jsx';

function Sidebar() {
  return (
    <>
      <div >
        <Header />
        <div className='flex flex-row'>
          <div className='sticky left-0'>
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
          <div className='flex flex-col'>
            <MessageContainer />
            <MessageInput />
          </div>



        </div>



      </div>
    </>

  );
}

export default Sidebar;