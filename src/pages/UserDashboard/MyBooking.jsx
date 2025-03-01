import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyBooking = () => {

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")


    useEffect(() => {
        try {
            setIsLoading(true)
            const fetchBooking = async () => {
                const response = await axios.get("http://localhost:3000/api/bookings/my-bookings/",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                console.log(response.data)
                setBookings(response.data.data)

            }
            fetchBooking()
        } catch (error) {
            setError("Error in fetching Bookings", error)

        } finally {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-6">{error}</div>;
    }


    return (
        <div className="p-6  mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Booking Management</h1>
            <div className="  bg-white shadow-md rounded-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-500 text-white">
                        <tr>

                            <th className="p-3 text-left">Ground</th>
                            <th className="p-3 text-left">Start Time</th>
                            <th className="p-3 text-left">End Time</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Status </th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center text-gray-500">No Bookings  available</td>
                                </tr>
                            ) :
                                bookings.map((booking, index) => (
                                    <tr key={booking._id} className={`border-b }`}>


                                        <td className="p-3">{booking.ground?.name || "NA"}</td>
                                        <td className="p-3">{booking.slot?.startTime} </td>
                                        <td className="p-3">{booking.slot?.endTime} </td>
                                        <td className="p-3">{booking.slot?.date} </td>
                                        <td className="p-3">{booking.slot?.price} </td>
                                        <td className="p-3">{booking.payment?.amount} </td>
                                        <td className="p-3">{booking.payment?.status} </td>
                                        <td className="p-3 text-right">

                                            <button onClick={() => handleDelete(slot._id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}




                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default MyBooking