import { Box, Stack } from '@mui/material'
import React from 'react'
import { BotMessage } from './BotMessage'
import { Input } from './Input'

export const Bot = () => {
    return (
        <>
            <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
                <Box width={"100%"} sx={{ flexGrow: 1 }}>
                    <BotMessage />

                </Box>

            </Stack>
            <Input />

        </>

    )
}
