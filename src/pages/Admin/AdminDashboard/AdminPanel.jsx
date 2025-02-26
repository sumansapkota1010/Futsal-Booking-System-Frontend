import React, { useState } from 'react'
import GroundManagement from './admin-ground/GroundManagement';
import SlotManagement from './admin-slot/SlotManagement';
import BookingManagement from './admin-booking/BookingManagement';
import PaymentManagement from './admin-payment/PaymentManagement';


const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("ground")

    const renderContent = () => {
        switch (activeTab) {
            case "ground":
                return <GroundManagement />
            case "slot":
                return <SlotManagement />
            case "booking":
                return <BookingManagement />
            case "payment":
                return <PaymentManagement />

            default:
                return <GroundManagement />
        }
    }


    return (
        <div className='flex min-h-screen bg-[#f4f7fe]'>

            <div className='bg-[#ffffff]  space-y-6 w-[350px] py-7  px-2'>
                <div className='text-2xl text-center text-[26px] leading-[24px]  tracking-normal text-[#2b3674] mt-3 font-bold '>Admin Panel</div>
                <nav className='    '>
                    <button onClick={() => setActiveTab("ground")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "ground" ? "bg-[#a3aed0]" : ""} `} ><span>Ground</span></button>


                </nav>
                <nav className=''>
                    <button onClick={() => setActiveTab("slot")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "slot" ? "bg-[#a3aed0]" : ""} `} ><span>Slot</span></button>


                </nav>
                <nav className=''>
                    <button onClick={() => setActiveTab("booking")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "booking" ? "bg-[#a3aed0]" : ""} `} ><span>Bookings</span></button>


                </nav>
                <nav className=''>
                    <button onClick={() => setActiveTab("payment")} className={`w-full flex items-center  text-[#4318ff] px-4 py-3 hover:text-orange-500 ${activeTab == "payment" ? "bg-[#a3aed0]" : ""} `} ><span>Payment</span></button>


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


export default AdminPanel