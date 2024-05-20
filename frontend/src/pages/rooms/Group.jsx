import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import React, { useState } from 'react'
import {
    Search, SearchIconWrapper,
    StyledInputBase,
} from '../../components/search/Search'
import {
    ArchiveBox,
    CircleDashed,
    MagnifyingGlass,
    Plus,
    Users,
} from "phosphor-react";
import CreateGroup from './CreateGroup';

import { SimpleBarStyle } from '../../components/scrollBar/ScrollBar';

const Group = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    return (
        <>
            <Stack direction={"row"} sx={{ width: "100%" }}>
                <Box sx={{
                    height: "100vh",
                    backgroundColor: "#f8faff",
                    width: 320,
                    boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"
                }}>

                    <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                        <Stack >
                            <Typography variant='h5'>
                                Groups
                            </Typography>
                        </Stack>

                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>

                        </Stack>

                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant="subtitle2" sx={{}} component={Link}>
                                Create New Group
                            </Typography>
                            <IconButton onClick={handleOpenDialog}>
                                <Plus style={{ color: "#000000"}} />
                            </IconButton>
                        </Stack>
                        <Divider />

                        <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
                            <SimpleBarStyle timeout={500} clickOnTrack={false}>
                                <Stack spacing={2.4}>

                                    <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                                        All Chats
                                    </Typography>
                                    {/* Chat List */}
                                    {/* {ChatList.filter((el) => !el.pinned).map((el, idx) => {
                                        return <ChatElement {...el} />;
                                    })} */}
                                </Stack>
                            </SimpleBarStyle>
                        </Stack>

                    </Stack>
                </Box>

            </Stack>
            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}

        </>
    )
}

export default Group
