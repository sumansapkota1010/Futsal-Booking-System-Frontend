import axios from 'axios'

import React, { useEffect, useState } from 'react'


const PaymentManagement = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [paymentPerPage, setPaymentPerPage] = useState(5)

    useEffect(() => {
        fetchPayment()
    }, [])


    const formattedDate = (dateString) => {
        const date = new Date(dateString)
        const createdAt = date.toLocaleDateString("en-US")
        return createdAt
    }


    const fetchPayment = async () => {

        try {
            setLoading(true)
            const response = await axios.get("http://localhost:3000/api/payment/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data)
            setPayments(response.data.data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Payment Fetching Failed",
                text: error.response?.data?.message || 'Fetching Payment Unsuccessful. Please try again.'
            })
        } finally {
            setLoading(false)
        }
    }

    const lastPaymentIndex = currentPage * paymentPerPage
    const firstPaymentIndex = lastPaymentIndex - paymentPerPage
    const currentPayment = payments.slice(firstPaymentIndex, lastPaymentIndex)
    const totalPayments = payments.length

    const pages = []
    for (let i = 1; i <= Math.ceil(totalPayments / paymentPerPage); i++) {
        pages.push(i)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(prev => prev + 1)
        }
    }



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Payments</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
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
                        {currentPayment.map((payment) => {
                            const createdAt = formattedDate(payment.createdAt)

                            return (
                                <tr key={payment._id} className="text-center">
                                    <td className="border p-2">{payment.user?.userName || "N/A"}</td>
                                    <td className="border p-2">{payment.booking?.ground?.name || "N/A"}</td>
                                    <td className="border p-2"> {payment.amount}</td>
                                    <td className="border p-2"> {payment?.status}</td>
                                    <td className="border p-2"> {createdAt}
                                    </td>
                                </tr>

                            )

                        }
                        )}

                    </tbody>
                </table>
            )}
            <div className="mt-4 flex justify-center item-center">
                {
                    <button
                        onClick={handlePrevPage}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage == 1 ? "cursor-not-allowed" : ""}`} >

                        Prev</button>
                }



                {pages.map((page, index) => {
                    return <button disabled={page == currentPage}
                        key={index}
                        onClick={() => { setCurrentPage(page) }}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 ${page == currentPage ? "bg-red-500" : ""}`} >{page}

                    </button>

                })}

                {
                    <button
                        onClick={handleNextPage}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage > 1 ? "cursor-not-allowed" : ""}`} >

                        Next</button>
                }
            </div>

        </div>

    )
}

export default PaymentManagement