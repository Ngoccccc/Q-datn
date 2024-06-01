import clsx from 'clsx'
import React, { useRef, useEffect } from 'react'
import { Badge, Avatar } from '@material-tailwind/react'
import { format } from "date-fns"

const MessageBox = ({ data, isLast }) => {
    const isOwn = true
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end "
    )

    const avatar = clsx(isOwn && "order-2 ")
    const body = clsx("flex flex-col gap-2", isOwn && "items-end")

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-blue-600 text-white" : "bg-gray-100",
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )
    return (
        <div className={container}>
            <div className={avatar}>
                <Badge placement="top-end" overlap="circular" color="green" withBorder>
                    <Avatar size="sm"
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        alt="avatar"
                    />
                </Badge>
            </div>

            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-sm text-gray-500'>
                        ten nguoi
                    </div>
                    <div className='text-xs text-gray-400'>
                        {format(new Date(), "p")}
                    </div>
                </div>
                <div className={message} ref={lastMessageRef}>
                    mee chan qua pi gioi oi fhdsfs fksdlfds
                </div>
                {
                    isLast && <div className='text-xs font-light text-gray-500'>
                        Seen by Quynh
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageBox
