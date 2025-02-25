import React, { useState } from 'react'
import AdminGround from './AdminGround';
import CreateGround from './CreateGround';
import { UpdateGround } from './UpdateGround';

const GroundManagement = () => {

    const [activeNavBar, setActiveNavBar] = useState("grounds")

    const renderContent = () => {
        switch (activeNavBar) {
            case "grounds":
                return <AdminGround />
            case "create":
                return <CreateGround />
            case "edit":
                return <UpdateGround />


            default:
                return <AdminGround />
        }

    }



    return (
        <div className=''>
            <div className='flex gap-9 justify-center '>

                <nav className=''>
                    <button onClick={() => { setActiveNavBar("grounds") }} className={` w-full flex items-center p-3 ${activeNavBar == "grounds" ? "bg-red-500 rounded-2xl" : ""}`} >Grounds</button>

                </nav>
                <nav className=''>
                    <button onClick={() => { setActiveNavBar("create") }} className={` w-full flex items-center p-3 ${activeNavBar == "create" ? "bg-red-500 rounded-2xl" : ""}`}>Create</button>
                </nav>

                <nav>
                    <div onClick={() => { setActiveNavBar("edit") }} className={` w-full flex items-center p-3 ${activeNavBar == "edit" ? "bg-red-500 rounded-2xl" : ""}`}>Update</div>
                </nav>
            </div>
            <div className=" mt-8 ">
                <header className="bg-white shadow-sm p-4 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold capitalize">{activeNavBar} </h1>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-sm">{renderContent()}</div>
            </div>
        </div>
    )
}
export default GroundManagement