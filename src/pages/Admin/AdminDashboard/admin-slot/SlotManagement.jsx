import React, { useState } from 'react'
import AdminSlot from './AdminSlot';
import CreateSlot from './CreateSlot';

const SlotManagement = () => {
    const [activeNavBar, setActiveNavBar] = useState("slots");




    const renderContent = () => {
        switch (activeNavBar) {
            case "slots":
                return <AdminSlot />;
            case "createslot":
                return <CreateSlot />;
            default:
                return <AdminSlot />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex gap-6 justify-center items-center mb-8">
                <nav className="w-1/4">
                    <button
                        onClick={() => setActiveNavBar("slots")}
                        className={`w-full flex items-center p-4 text-lg font-semibold text-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-100 hover:scale-105 ${activeNavBar === "grounds" ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
                    >
                        Slots
                    </button>
                </nav>
                <nav className="w-1/4">
                    <button
                        onClick={() => setActiveNavBar("createslot")}
                        className={`w-full flex items-center p-4 text-lg font-semibold text-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-100 hover:scale-105 ${activeNavBar === "create" ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
                    >
                        Create
                    </button>
                </nav>
            </div>
            <div className="px-8 pt-0">

                <div className="bg-white p-6 rounded-lg shadow-md">{renderContent()}</div>
            </div>
        </div>
    );
}

export default SlotManagement