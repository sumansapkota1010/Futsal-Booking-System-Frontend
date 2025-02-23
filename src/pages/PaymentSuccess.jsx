import React from "react";

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-gray-700">
                    Thank you for your payment. Your booking has been confirmed.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;