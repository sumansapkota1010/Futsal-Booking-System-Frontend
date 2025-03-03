import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingPerPage, setBookingPerPage] = useState(5);
    const [search, setSearch] = useState("")



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


    const filteredBookings = bookings.filter((booking) => {
        return search.toLowerCase() === ""
            ? true
            : booking.user?.userName?.toLowerCase().includes(search.toLowerCase());
    });





    const lastBookingIndex = currentPage * bookingPerPage
    const firstBookingIndex = lastBookingIndex - bookingPerPage

    const currentBooking = filteredBookings.slice(firstBookingIndex, lastBookingIndex)
    const totalBooking = filteredBookings.length

    const pages = []
    for (let i = 1; i <= Math.ceil(totalBooking / bookingPerPage); i++) {
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
            <h2 className="text-2xl font-bold mb-4  ">All Bookings</h2>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            {loading ? (
                <p>Loading...</p>
            ) : (


                <table className="mt-3 w-full border-collapse border border-gray-300">
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
                        {currentBooking.map((booking) => (
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


    );
};

export default BookingManagement;
