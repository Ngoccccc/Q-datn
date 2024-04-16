import React from 'react'
import { Box, Stack } from "@mui/material"
import { Timeline, TextMsg } from './MsgTypes'


const chat_history = [
    {
        id: 1,
        type: "msg",
        message: "Hi",
        incoming: true,
        outgoing: false,

    },
    {
        id: 2,
        type: "divider",
        message: "Today",
        text: "today"
    },
    {
        id: 3,
        type: "msg",
        message: "xin chao",
        incoming: false,
        outgoing: true,
    },
    {
        id: 4,
        type: "msg",
        message: "xin chao",
        incoming: false,
        outgoing: true,
    },
    {
        id: 5,
        type: "msg",
        message: "xin chao",
        incoming: true,
        outgoing: false,
    },
]

export const BotMessage = () => {
    return (
        // <>
        // <Timeline/>
        // </>
        <Box p={3}>
            <Stack spacing={3}>
                {
                    chat_history.map((el) => {
                        switch (el.type){
                            case "divider":
                                return  <Timeline el={el} key={el.id}/>

                            // case "msg":

                            // case "doc":
                            // case "link":
                            // case "reply":

                            default:
                                return <TextMsg el={el} key={el.id}/>
                            
                        }
                    })
                }
            </Stack>
        </Box>
    )
}
