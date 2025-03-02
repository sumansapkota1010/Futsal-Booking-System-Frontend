import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const pidx = searchParams.get("pidx");
    const amount = searchParams.get("amount");
    const status = searchParams.get("status");
    const bookingId = searchParams.get("bookingId");

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold my-4">Payment Successful!</h1>
            <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Booking ID:</span>
                        <span className="font-semibold">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Amount Paid:</span>
                        <span className="font-semibold">NPR {amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Payment ID:</span>
                        <span className="font-semibold">{pidx}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-green-500">{status}</span>
                    </div>
                </div>
                <p className="mt-6 text-green-500">
                    Thank you for your payment. Your booking is confirmed!
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;