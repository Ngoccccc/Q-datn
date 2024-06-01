import React from 'react'
import Header from '../layouts/Header'
import Sidebar from '../layouts/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <div className='w-full max-w-screen-xl'>
        <Header />
      </div>
      {/* <div className="h-5/6 w-full max-w-screen-xl  rounded-xl shadow-md bg-white" >
        <Outlet  />
      </div > */}
      <Outlet/>

      {/* <div className='h-5/6 max-w-screen-xl w-full flex flex-row gap-4 m-4'>
        <div className="w-1/4 rounded-xl shadow-md bg-white hidden lg:flex" >
          <Sidebar />
        </div>

        <div className="flex-1  rounded-xl shadow-md bg-white" >
          <Outlet className="flex-1" />
        </div >
      </div> */}
    </div>

  )
}

export default Home
