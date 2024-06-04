import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Chats from './Chats';
import Analysis from './Analysis';
import Landing from '../components/Landing/Landing';
import BadgeDefault from '../nhap';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Landing />
            },
            {
                path: "chats",
                element: <Chats />
            },
            {
                path: "analysis",
                element: <Analysis />
            },
            {
                path: "nhap",
                element: <BadgeDefault />
            },

        ]
    },
]);

export default router
