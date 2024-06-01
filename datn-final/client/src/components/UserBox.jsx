import React from 'react'
import {
    ListItem, ListItemPrefix, Badge, Avatar, Typography
} from "@material-tailwind/react";
import { PowerIcon } from '@heroicons/react/24/solid';

const UserBox = () => {
    return (
        <div>
            <ListItem>
                <ListItemPrefix>
                    <div className="flex items-center gap-4">
                        <Badge placement="top-end" overlap="circular" color="green" withBorder>
                            <Avatar
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                            />
                        </Badge>
                        <div>
                            <Typography variant="h6">Tania Andrew</Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                Web Developer
                            </Typography>
                        </div>
                    </div>
                </ListItemPrefix>
            </ListItem>
        </div>
    )
}

export default UserBox
