import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";
import Swal from 'sweetalert2';


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
                console.log(response.data.data)
                setBookings(response.data.data)

            }
            fetchBooking()
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error in fetching bookings",
                text: error.response?.data?.message || 'Fetching bookings Unsuccessful. Please try again.'
            })

        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleCancel = async (id) => {
        if (!id) return;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'Cancel',
        })

        if (result.isConfirmed) {
            try {
                const response = await axios.post(
                    `http://localhost:3000/api/bookings/cancel/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Booking Cancelled',
                        text: 'The booking has been cancelled successfully.',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Booking Cancel Failed",
                    text: error.response?.data?.message || 'Cancel Booking Unsuccessful. Please try again.'
                })
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Booking not cancelled"
            })
        }
    };


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
                            <th className="p-3 text-left">Booking Status</th>

                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Payment Status </th>
                            <th className="p-3 text-left">Actions</th>
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
                                        <td className="p-3">{format(new Date(booking.slot?.date), "yyyy-MM-dd")}</td>
                                        <td className={` p-5 ${booking.status === "confirmed" ? "text-green-500" : `${booking.status === "cancelled" ? "text-red-500 " : "text-yellow-500  "}`}`}>{booking.status} </td>

                                        <td className="p-3">{booking.slot?.price} </td>
                                        <td className="p-3">{booking.payment?.amount} </td>
                                        <td className={` p-5 ${booking.payment?.status === "completed" ? "text-green-500" : "text-red-500"}`}>{booking.payment?.status} </td>
                                        <td className="p-5 flex text-left ">

                                            <button onClick={() => handleCancel(booking._id)} className=" flex gap-1   text-red-500 hover:text-red-700">

                                                Cancel   <MdCancel className='mr-5 mt-1' size={18} />
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