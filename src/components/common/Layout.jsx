import React from 'react'
import { Outlet } from 'react-router-dom'
import BackgroundVideo from './backgroundvideo/BackgroundVideo'
import AboutUs from '../main/aboutus/AboutUs'

const Layout = () => {
    return (
        <>
            <BackgroundVideo />

            <AboutUs />


            <Outlet />
        </>

    )
}

export default Layout