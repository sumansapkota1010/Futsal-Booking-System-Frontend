import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/bookings/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setBookings(res.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error in Fetching Bookings",
                text: error.response?.data?.message || 'Bookings fetching Unsuccessful. Please try again.'
            })
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {

        const result = await Swal.fire({
            title: 'Are You Sure? You want to cancel?',
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
                const response = await axios.post(`http://localhost:3000/api/bookings/admin/cancel/${bookingId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Cancelled Booking',
                    text: 'The booking has been cancel successfully.',
                    showConfirmButton: false,
                    timer: 1000,
                })

                setTimeout(() => {

                    fetchBookings();
                }, 1000);

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Booking cancel failed",
                    text: error.response?.data?.message || 'Booking cancel Unsuccessful. Please try again.'
                })
            }
        }



    };
    const handleDeleteBooking = async (bookingId) => {
        if (!bookingId) return
        const result = await Swal.fire({
            title: 'Are You Sure? You want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        })
        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`http://localhost:3000/api/bookings/admin/delete/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Booking deleted successfull',
                    text: 'The booking has been deleted successfully.',
                    showConfirmButton: false,
                    timer: 1000,
                })
                setBookings((bookings).filter(booking => bookingId !== booking._id))

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Booking deletion Failed",
                    text: error.response?.data?.message || 'Booking deletion Unsuccessful. Please try again.'
                })
            }
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
                            <th className="border p-2">Ground</th>
                            <th className="border p-2">Slot</th>
                            <th className="border p-2">Payment</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="text-center">
                                <td className="border p-2">{booking.user?.userName || "N/A"}</td>
                                <td className="border p-2">{booking.ground?.name || "N/A"}</td>
                                <td className="border p-2">
                                    {booking.slot?.startTime} - {booking.slot?.endTime}
                                </td>
                                <td className="border p-2">
                                    {booking.payment ? `${booking.payment.amount}` : "Unpaid"}
                                </td>
                                <td className="border p-2">{booking.status}</td>
                                <td className="flex justify-center space-x-7 border p-2">
                                    {booking.status !== "cancelled" ? (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">Cancelled</span>
                                    )}

                                    <button
                                        onClick={() => handleDeleteBooking(booking._id)}
                                        className="  bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingManagement;
