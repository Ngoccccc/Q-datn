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
    IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const { setUser } = ChatState();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);



    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            // toast
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
                // handleOpen(false);
                navigate('/')
            }).catch((error) => {
                // toast
                setLoading(false);
            })

            // toast  
        } catch (error) {
            // toast
            setLoading(false);
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
                                Đăng nhập
                            </Typography>
                            <Link to="/">
                            
                            <IconButton variant="text" color="gray" size="sm" className="rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </IconButton>
                            </Link>
                        </div>


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
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Bạn chưa có tài khoản?
                            <Link to={"/signup"}>
                            <Typography
                                // as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                // onClick={handleOpenSignup }
                            >
                                Đăng ký
                            </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default Login