import { Box, Stack } from '@mui/material'
import React from 'react'
import { BotMessage } from './BotMessage'
import SimpleMentionEditor from './inputToBot/SimpleMentionEditor.jsx'

export const Bot = () => {
    return (
        <>
            <Stack height={"100%"} maxHeight={"100vh"} width={"100%"}>
                <Box width={"100%"} sx={{ flexGrow: 1 }}>
                    <BotMessage />

                </Box>

            </Stack>
            <SimpleMentionEditor/>

        </>

    )
}
