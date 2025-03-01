import axios from 'axios'
import React, { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';

const VerifyOtp = () => {

    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()
    const email = location.state?.email || ""
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        console.log(otp)
        console.log(email)
        try {
            const response = await axios.post(
                'http://localhost:3000/api/verifyotp',
                { email, otp },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('OTP verified successfully!');
                navigate('/resetpassword', { state: { email } }); // Redirect to reset password page
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error verifying OTP');
            alert(error.response?.data?.message, "Error in verifying otp")
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Verify OTP
                </h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter your OTP
                </p>



                <form onSubmit={handleSubmit} className="mt-6">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}

                        numInputs={4}
                        renderSeparator={<span className="  mx-8">-</span>}
                        renderInput={(props) => <input {...props} className='w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all' />}
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-center text-sm text-gray-600">{error}</p>
                )}


                <div className="text-center mt-6">
                    <Link to="/login" className="  text-green-600 hover:underline text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp