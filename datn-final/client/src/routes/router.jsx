import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Chats from './Chats';
import Analysis from './Analysis';
import Landing from '../components/Landing/Landing';

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

        ]
    },
]);

export default router
