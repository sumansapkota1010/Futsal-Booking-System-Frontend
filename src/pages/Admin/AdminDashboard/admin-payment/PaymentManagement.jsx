import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentPerPage, setPaymentPerPage] = useState(5);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPayment();
    }, []);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const createdAt = date.toLocaleDateString("en-US");
        return createdAt;
    };

    const fetchPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/payment/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data.data);
            setPayments(response.data.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Payment Fetching Failed",
                text: error.response?.data?.message || 'Fetching Payment Unsuccessful. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredPayment = payments.filter((payment) => {
        return search.toLowerCase() === ""
            ? true
            : payment.user?.userName?.toLowerCase().includes(search.toLowerCase());
    });

    const lastPaymentIndex = currentPage * paymentPerPage;
    const firstPaymentIndex = lastPaymentIndex - paymentPerPage;
    const currentPayment = filteredPayment.slice(firstPaymentIndex, lastPaymentIndex);
    const totalPayments = filteredPayment.length;

    const pages = [];
    for (let i = 1; i <= Math.ceil(totalPayments / paymentPerPage); i++) {
        pages.push(i);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Payments</h2>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="mt-3 w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">User</th>
                            <th className="border p-2">Booking</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPayment.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-4 text-center text-gray-500">No payments available</td>
                            </tr>
                        ) : (
                            currentPayment.map((payment) => {
                                const createdAt = formattedDate(payment.createdAt);

                                return (
                                    <tr key={payment._id} className="text-center">
                                        <td className="border p-2">{payment.user?.userName || "N/A"}</td>
                                        <td className="border p-2">{payment.booking?.ground?.name || "N/A"}</td>
                                        <td className="border p-2">{payment.amount}</td>
                                        <td className={`border p-2 ${payment.status === "completed" ? "bg-green-500" : "bg-red-500"}`}>
                                            {payment?.status}
                                        </td>
                                        <td className="border p-2">{createdAt}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            )}
            <div className="mt-4 flex justify-center items-center">
                <button
                    onClick={handlePrevPage}
                    className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
                >
                    Prev
                </button>

                {pages.map((page, index) => (
                    <button
                        disabled={page === currentPage}
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${page === currentPage ? "bg-red-500" : ""}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage === pages.length ? "cursor-not-allowed" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentManagement;