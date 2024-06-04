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
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

function Login({ open, handleOpen }) {
    const navigate = useNavigate();

    const { setUser } = ChatState();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);



    const submitHandler = async () => { 
        console.log(email, password);
        setLoading(true);
        if (!email || !password) {
            // toast
            console.log("Please enter email and password");
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            await axios.post(
                "/api/user/login",
                { email, password },
                config
            ).then((res) => {
                toast.success("Đăng nhập thành công !", {
                    position: "top-center",
                })
                setUser(res);
                localStorage.setItem("userInfo", JSON.stringify(res));
                setLoading(false);
                handleOpen(false);
                navigate('/')
            }).catch((error) => {
                // toast
                console.log(error);
                setLoading(false);
            })

            // toast  
            console.log(data);
        } catch (error) {
            // toast
            setLoading(false);
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
                           Đăng nhập
                        </Typography>

                        <Typography className="-mb-2" variant="h6">
                            Email
                        </Typography>
                        <Input color="blue" label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
                        <Typography className="-mb-2" variant="h6" >
                            Password
                        </Typography>
                        <Input color="blue" label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button color="blue" onClick={submitHandler} fullWidth>
                            Đăng nhập
                        </Button>
                        {/* <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                // as="a"
                                // href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                // onClick={handleOpenSignup }
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

export default Login