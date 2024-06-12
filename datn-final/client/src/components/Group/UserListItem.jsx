import { Badge, Avatar, Card, Typography } from '@material-tailwind/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Card className='flex flex-row gap-2' onClick={handleFunction}>
      <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
      <div className='flex flex-col'>
        <Typography variant="h6">{user.name}</Typography>
        <Typography color="gray" className="text-sm">{user.email}</Typography>
      </div>
    </Card>
  )
}

export default UserListItem
