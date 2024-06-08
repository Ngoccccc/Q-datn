import { Badge, Avatar } from '@material-tailwind/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className='flex flex-row' onClick={handleFunction}>
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
          <div className='flex flex-col'>
              <span>{user.name}</span>
              <span>{user.email}</span>
          </div>
    </div>
  )
}

export default UserListItem
