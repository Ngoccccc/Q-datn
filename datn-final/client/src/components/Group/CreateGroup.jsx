import React from "react";
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

export function CreateGroup() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

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
                        <Input label="tên nhóm" size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Thành viên
                        </Typography>
                        <Input label="thành viên" size="lg" />
                        <div className="-ml-2.5 -mt-3 ">
                            <Checkbox color="blue" label="Tạo file Google Sheet mới cho nhóm" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button  className="bg-blue-800" onClick={handleOpen} fullWidth>
                            Tạo
                        </Button>
                        
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}