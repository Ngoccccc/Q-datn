import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const Timeline = ({ el }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography>{el.message}</Typography>
      <Divider width="46%" />
    </Stack>
  )
}

const TextMsg = ({el}) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ background: el.incoming ? "black" : "blue", borderRadius: 1.5, width:"max-content" }}>
        <Typography variant='body2' color={el.incoming ? "white" : "white"}>{el.message}</Typography>
      </Box>

    </Stack>
  )
}

export { Timeline, TextMsg }
