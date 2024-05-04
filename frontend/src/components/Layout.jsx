import React from 'react'
import { Outlet } from "react-router-dom"
import { Navbar } from './navbar/Navbar'

export const Layout = () => {
    return (
        <div className='overflow-auto max-h-screen flex flex-col items-center'>
            <Navbar  />
            <div className='h-[calc(100vh-4rem)]'>
                {<Outlet />}
            </div>
            {/* <div>footer</div> */}
        </div>
    )
}
