import React from 'react'
import Header from './Header'
import Body from './Body'
import InputMessage from './MessageInput'

const Conversation = () => {
  return (
    <div className='h-full flex flex-col'>
      <Header />
      <Body />
      <InputMessage className='bottom-0' />
    </div>
  )
}

export default Conversation
