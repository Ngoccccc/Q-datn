import React, { useState } from "react";
import { useToast } from "@chakra-ui/toast";
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
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({ open, handleOpen }) {
    const toast = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);


    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            ).then((res) => {
                
                console.log(res);
                toast({
                    title: "Registration Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(res));
                setPicLoading(false);
                handleOpen(false);
                navigate("/chats");
            }).catch((err) => {
                toast({
                    title: "Error Occured!",
                    description: err.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setPicLoading(false);
            });
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushproj");
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Đăng ký
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Username
                        </Typography>
                        <Input color="blue" label="Username" size="lg" onChange={(e) => setName(e.target.value)} />

                        <Typography className="-mb-2" variant="h6">
                            Email
                        </Typography>
                        <Input color="blue" label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
                        <Typography className="-mb-2" variant="h6">
                            Password
                        </Typography>
                        <Input color="blue" label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
                        <Typography className="-mb-2" variant="h6">
                            Confirm Password
                        </Typography>
                        <Input color="blue" label="Confirm" size="lg" onChange={(e) => setConfirmpassword(e.target.value)} />
                        <Typography className="-mb-2" variant="h6">
                            Avatar
                        </Typography>
                        <Input type="file"
                            p={1.5}
                            className=" disabled:bg-none"
                            accept="image/*" size="lg" label="Avatar" color="blue"
                            onChange={(e) => postDetails(e.target.files[0])}
                        />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button color="blue" fullWidth onClick={submitHandler}>
                            Đăng ký
                        </Button>
                        {/* <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                                
                            >
                                Sign up
                            </Typography>
                        </Typography> */}
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default Signup