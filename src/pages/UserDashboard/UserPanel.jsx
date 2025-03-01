import React, { useState } from 'react'
import ProfileComponent from './ProfileComponent';
import MyBooking from './MyBooking';

const UserPanel = () => {

    const [activeTab, setActiveTab] = useState("profile")

    const renderContent = () => {

        switch (activeTab) {
            case "profile":
                return <ProfileComponent />
            case "mybooking":
                return <MyBooking />
            default:
                return <ProfileComponent />
        }


    }


    return (
        <div className='flex min-h-screen bg-[#f4f7fe]'>

            <div className='bg-[#ffffff]  space-y-6 w-[350px] py-7  px-2'>
                <div className='text-2xl text-center text-[26px] leading-[24px]  tracking-normal text-[#2b3674] mt-3 font-bold '>User Dashboard</div>
                <nav className='    '>
                    <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "profile" ? "bg-[#a3aed0]" : ""} `} ><span>Profile</span></button>


                </nav>
                <nav className=''>
                    <button onClick={() => setActiveTab("mybooking")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "mybooking" ? "bg-[#a3aed0]" : ""} `} ><span>My Bookings</span></button>


                </nav>


            </div>


            <div className="flex-1 p-8">
                <header className="bg-white shadow-sm p-4 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold capitalize">{activeTab} Management</h1>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-sm">{renderContent()}</div>
            </div>


        </div>
    )
}

export default UserPanel