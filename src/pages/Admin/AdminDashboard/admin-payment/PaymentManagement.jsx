import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaS } from 'react-icons/fa6'

const PaymentManagement = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchPayment()
    }, [])

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
            console.log("Error fetching payments:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
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
                            <th className="border p-2">Method</th>

                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="text-center">
                                <td className="border p-2">{payment.user?.userName || "N/A"}</td>
                                <td className="border p-2">{payment.booking?.ground?.name || "N/A"}</td>
                                <td className="border p-2"> {payment.amount}</td>
                                <td className="border p-2"> {payment?.status}</td>
                                <td className="border p-2">{payment?.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default PaymentManagement