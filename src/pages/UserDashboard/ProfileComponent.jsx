import React, { useState } from 'react'
import MyProfile from './MyProfile';
import UpdatePassword from './UpdatePassword';
import DeleteProfile from './DeleteProfile';

const ProfileComponent = () => {
    const [activeNavBar, setActiveNavBar] = useState("myprofile");

    const renderContent = () => {
        switch (activeNavBar) {
            case "myprofile":
                return <MyProfile />;
            case "update":
                return <UpdatePassword />;
            case "delete":
                return <DeleteProfile />;
            default:
                return <MyProfile />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex gap-6 justify-center items-center mb-8">
                <nav className="w-1/4">
                    <button
                        onClick={() => setActiveNavBar("myprofile")}
                        className={`w-full flex items-center p-4 text-lg font-semibold text-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-100 hover:scale-105 ${activeNavBar === "myprofile" ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
                    >
                        My Profile
                    </button>
                </nav>
                <nav className="w-1/4">
                    <button
                        onClick={() => setActiveNavBar("update")}
                        className={`w-full flex items-center p-4 text-lg font-semibold text-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-100 hover:scale-105 ${activeNavBar === "update" ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
                    >
                        Update Password
                    </button>
                </nav>
                <nav className="w-1/4">
                    <button
                        onClick={() => setActiveNavBar("delete")}
                        className={`w-full flex items-center p-4 text-lg font-semibold text-gray-700 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-100 hover:scale-105 ${activeNavBar === "delete" ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
                    >
                        Delete Profile
                    </button>
                </nav>
            </div>
            <div className="px-8 pt-0">

                <div className="bg-white p-6 rounded-lg shadow-md">{renderContent()}</div>
            </div>
        </div>
    );
}

export default ProfileComponent