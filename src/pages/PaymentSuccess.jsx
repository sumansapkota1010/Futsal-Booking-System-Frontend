import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaMoneyBillAlt, FaMobileAlt, FaInfoCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const pidx = searchParams.get("pidx");
    const bookingId = searchParams.get("bookingId");
    const amount = searchParams.get("amount");
    const status = searchParams.get("status");
    const mobile = searchParams.get("mobile");

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4">
                <div className="text-center mb-8">
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
                    <p className="text-gray-600 mt-2">Thank you for your payment. Your booking is confirmed.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <FaCalendarAlt className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Booking ID</p>
                            <p className="text-lg font-semibold text-gray-800">{bookingId}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaMoneyBillAlt className="text-2xl text-green-500" />
                        <div>
                            <p className="text-sm text-gray-500">Amount Paid</p>
                            <p className="text-lg font-semibold text-gray-800">NPR {amount}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaInfoCircle className="text-2xl text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Payment ID</p>
                            <p className="text-lg font-semibold text-gray-800">{pidx}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaMobileAlt className="text-2xl text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Mobile Number</p>
                            <p className="text-lg font-semibold text-gray-800">{mobile}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaCheckCircle className="text-2xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-lg font-semibold text-green-500">{status}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        If you have any questions, please contact our support team.
                    </p>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
