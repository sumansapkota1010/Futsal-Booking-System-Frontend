import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Swal from 'sweetalert2';



const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()
    const navigate = useNavigate()



    //email
    const email = location.state?.email || ""

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {

            const response = await axios.post("http://localhost:3000/api/resetpassword", { email, newPassword, confirmPassword }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Password reset successfull",
                    text: "You will be redirect to login...",
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: true
                })
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Reset Password Failed",
                text: error.response?.data?.message || 'Reset Password Unsuccessfull. Please  try again.'
            })
        } finally {
            setIsLoading(false)
        }

    }
    console.log(email)


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Reset Password
                </h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter your new password
                </p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className='absolute top-4 left-3' ></FontAwesomeIcon>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="relative mt-2.5">
                        <FontAwesomeIcon icon={faLock} className='absolute top-4 left-3' ></FontAwesomeIcon>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Reset'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword