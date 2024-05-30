import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Chats from './Chats';
import Analysis from './Analysis';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
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
