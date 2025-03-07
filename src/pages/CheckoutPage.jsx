import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import khaltiImage from '../assets/court/khalti.png';
import axios from "axios";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingId, amount } = location.state || {};

    const { payment, loading, error } = useSelector((state) => state.bookings);
    const [paymentMethod, setPaymentMethod] = useState("khalti");

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleKhaltiPayment = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `https://futsalbookingsystem.onrender.com/${bookingId}`,
                { amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Backend response:", response.data);
            if (response.data && response.data.payment_url) {
                window.location.href = response.data.payment_url;
            } else if (response.data && response.data.success) {
                navigate(`/payment-success?bookingId=${bookingId}&amount=${amount}`);
            }
        } catch (err) {
            console.error("Payment initiation failed:", err);
            console.error("Error response:", err.response?.data);
        }
    };

    const handleCOD = () => {
        alert("Your booking is confirmed. Payment will be collected on delivery.");
        navigate("/bookings");
    };

    const handleProceedToPayment = () => {
        if (paymentMethod === "khalti") {
            handleKhaltiPayment();
        } else if (paymentMethod === "COD") {
            handleCOD();
        }
    };

    if (!bookingId || !amount) {
        return (
            <div className="text-center mt-8 text-red-500">
                Invalid booking details. Please try again.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center my-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Booking ID:</span>
                            <span className="font-semibold">{bookingId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-semibold">NPR {amount}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <form className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="khalti"
                                name="paymentMethod"
                                value="khalti"
                                checked={paymentMethod === "khalti"}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="khalti" className="flex items-center">
                                <img
                                    src={khaltiImage}
                                    alt="Khalti"
                                    className="w-16 mr-2"
                                />
                                <span>Pay with Khalti</span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="cod" className="flex items-center">
                                <span>Cash on Delivery (COD)</span>
                            </label>
                        </div>
                    </form>

                    <button
                        onClick={handleProceedToPayment}
                        disabled={loading}
                        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Proceed to Payment"}
                    </button>

                    {error && (
                        <div className="text-red-500 mt-4 text-center">{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;