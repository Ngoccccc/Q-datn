import React from 'react'
import { Outlet } from "react-router-dom"
import { Navbar } from './navbar/Navbar'

export const Layout = () => {
    return (
        <div>
            <Navbar className='w-screen' />
            <div >
                {<Outlet />}
            </div>
            <div>footer</div>
        </div>
    )
}
