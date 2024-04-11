import React from 'react';
// import Conversation from './Conversation.jsx';
import Header from './Header.jsx';
import MessageContainer from './messages/MessageContainer.jsx';
import MessageInput from './messages/MessageInput.jsx';
import Conversations from './messages/Conversations.jsx';

function Sidebar() {
  return (
    <>
      <div >
        <Header />
        <div className='flex flex-row'>
          <div className='sticky left-0'>
            <Conversations/>
          </div>
          <div className='flex flex-col'>
            <MessageContainer />
          </div>



        </div>



      </div>
    </>

  );
}

export default Sidebar;