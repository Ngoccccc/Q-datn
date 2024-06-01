import React from 'react'
import MessageBox from './MessageBox'

const Body = () => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <MessageBox data='hello' isLast={false}/>
      <MessageBox data='helo' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='ello' isLast={false} />
      <MessageBox data='hello=' isLast={true} />
    </div>
  )
}

export default Body
