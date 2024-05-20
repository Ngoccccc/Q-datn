import React from 'react'
import { Bot } from '../../components/bot/Bot'
import { Chats } from '../../components/sidebar/Chats'
import { Box, Stack } from '@mui/material'

const MyBot = () => {
  return (
    // <div className='w-screen'>
      <Stack direction={"row"} >
        {/* <Bot/> */}
        <Chats />
        <Bot />

      </Stack>

    // </div>

  )
}

export default MyBot
