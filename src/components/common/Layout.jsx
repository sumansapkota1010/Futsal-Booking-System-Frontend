import React from 'react'
import { Outlet } from 'react-router-dom'
import BackgroundVideo from './backgroundvideo/BackgroundVideo'

const Layout = () => {
    return (
        <>
            <BackgroundVideo />
            <Outlet />
        </>

    )
}

export default Layout