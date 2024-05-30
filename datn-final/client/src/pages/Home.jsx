import React from 'react'
import Header from '../layouts/Header'
import Sidebar from '../layouts/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <Outlet/>
      </div>
    </>
  )
}

export default Home
