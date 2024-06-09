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
    Alert,
    IconButton
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


function Signup() {
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
            // toast 
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            // toast
            return;
        }
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
                toast.success("Đăng ký thành công !", {
                    position: "top-center",
                });
                localStorage.setItem("userInfo", JSON.stringify(res));
                setPicLoading(false);
                // handleOpen(false);
                navigate("/login");
            }).catch((err) => {
                // toast 
                setPicLoading(false);
            });
        } catch (error) {
            //toast
            setPicLoading(false);
        }
    };


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            //toast

            return;
        }
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
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            //toast
            setPicLoading(false);
            return;
        }
    };

    return (
        <>
            <Dialog
                size="xs"
                open={true}
                // handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Typography variant="h4" color="blue-gray">
                                Đăng ký
                            </Typography>
                            <Link to="/">
                            <IconButton variant="text" color="gray" className="rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </IconButton>
                            </Link>
                        </div>
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
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Bạn đã có tài khoản
                            <Link to={"/login"}>
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                
                            >
                                Đăng nhập
                            </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default Signup