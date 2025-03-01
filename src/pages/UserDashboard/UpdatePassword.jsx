import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.patch("http://localhost:3000/api/changepassword", { oldPassword, newPassword, confirmPassword }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status == 200) {
                alert("Password changed successfully")
                navigate("/user")
            }

        } catch (error) {
            console.error("Error in changing password", error)
        } finally {
            setIsLoading(false)

        }

    }
    if (isLoading) {
        return <div className="text-center py-6">Loading...</div>;
    }


    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Password</h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
                <div >
                    <label className='block text-sm font-medium text-gray-700' >Old Password </label>
                    <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700' htmlFor="newPassword">New Password </label>
                    <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password </label>
                    <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Update Password
                    </button>
                </div>

            </form>
        </div>



    )
}

export default UpdatePassword