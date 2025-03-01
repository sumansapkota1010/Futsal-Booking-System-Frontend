import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:3000/api/forgetpassword',
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('OTP sent successfully to your email.');
                navigate('/verifyotp', { state: { email } }); // Pass email to the next page
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error sending OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Forgot Password
                </h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter your email to receive a reset OTP.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-center text-sm text-red-600">{error}</p>
                )}

                <div className="text-center mt-4">
                    <Link to="/login" className="text-green-600 hover:underline text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;