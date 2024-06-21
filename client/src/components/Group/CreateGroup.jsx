import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import UserBadgeItem from "./UserBadgeItem";

import UserListItem from "./UserListItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

export function CreateGroup() {
    const { user } = ChatState();
    const [open, setOpen] = React.useState(false);

    // const [search, setSearch] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState("");
    const handleOpen = () => setOpen(!open);

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.error("Người dùng đã được thêm");
            return;
        }
        console.log("userToAdd", userToAdd);

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    const handleSearch = async (query) => {
        // setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            // toast({
            //     title: "Please fill all the feilds",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "top",
            // });
            return;
        }
        selectedUsers.push(user?.data);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            toast.success("Tạo nhóm thành công", {
                position: "top-center",
            });
            setOpen(false);
            // setChats([data, ...chats]);
            // onClose();
            // console.log("thanh cong");
            
        } catch (error) {
            // toast({
            //     title: "Failed to Create the Chat!",
            //     description: error.response.data,
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
        }
    };

    return (
        <>
            <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Tạo nhóm mới
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Tên nhóm
                        </Typography>
                        <Input label="tên nhóm" size="lg" onChange={e => setGroupChatName(e.target.value)}/>
                        <Typography className="-mb-2" variant="h6">
                            Thành viên
                        </Typography>
                        <Input label="thành viên" size="lg" onChange={(e) => handleSearch(e.target.value)} />
                        {/* --------------------------------- */}

                        <div className="flex flex-row gap-1">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </div>


                        {loading ? (
                            // <ChatLoading />
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                    .map((user) => {
                                    console.log(selectedUsers);
                                    return (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                    )

                                })
                        )}




                        {/* --------------------------------- */}

                        <div className="-ml-2.5 -mt-3 ">
                            <Checkbox color="blue" label="Tạo file Google Sheet mới cho nhóm" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className="bg-blue-800" onClick={handleSubmit} fullWidth>
                            Tạo
                        </Button>

                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}