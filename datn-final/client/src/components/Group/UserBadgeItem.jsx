import React from 'react'

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
      <div onClick={handleFunction}>
          {user.name}
          {admin === user._id && <span> (Admin)</span>}
    </div>
  )
}

export default UserBadgeItem
