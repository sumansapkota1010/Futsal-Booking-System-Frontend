import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { format, set } from "date-fns";

const AdminSlot = () => {
    const [slots, setSlots] = useState([]);
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [currentPage, setCurrentPage] = useState(1)
    const [slotPerPage, setSlotPerPage] = useState(5)








    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/slot/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setSlots(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Slot Fetching Failed",
                    text: error.response?.data?.message || 'Error in Fetching Slot ..Please try again.'
                })
            }
        };
        fetchSlots();
    }, []);

    const handleDelete = async (id) => {
        if (!id) return
        const result = await Swal.fire({
            title: 'Are you sure?',
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
                await axios.delete(`http://localhost:3000/api/slot/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setSlots(slots.filter(slot => slot._id !== id))
                Swal.fire({
                    icon: 'success',
                    title: 'Slot deleted',
                    text: 'The slot has been deleted successfully.',
                    showConfirmButton: false,
                    timer: 1000,
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Slot deletiom failed",
                    text: error.response?.data?.message || 'Slot deletion Unsuccessful. Please try again.'
                })
            }
        }


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



    const formattedDate = (dateString) => {
        const date = new Date(dateString)
        const slotDate = date.toISOString().slice(0, 10)
        return slotDate
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)


    // slot filter garne based on selected date

    const filteredSlots = slots.filter((slot) => format(new Date(slot.date), "yyyy-MM-dd") === selectedDate)

    const lastSlotIndex = currentPage * slotPerPage
    const firstSlotIndex = lastSlotIndex - slotPerPage
    const currentSlot = filteredSlots.slice(firstSlotIndex, lastSlotIndex)
    const totalSlots = filteredSlots.length

    let pages = []
    for (let i = 1; i <= Math.ceil(totalSlots / slotPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="p-6  mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Slot Management</h1>


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="  bg-white shadow-md rounded-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-500 text-white">
                        <tr>

                            <th className="p-3 text-left">Ground</th>
                            <th className="p-3 text-left">Start Time</th>
                            <th className="p-3 text-left">End Time</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Booked By </th>
                            <th className="p-3 text-left">Date</th>

                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredSlots.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center text-gray-500">No slots available</td>
                                </tr>
                            ) :
                                currentSlot.map((slot, index) => {
                                    const slotDate = formattedDate(slot.date)

                                    return (

                                        <tr key={slot._id} className={`border-b }`}>


                                            <td className="p-3">{slot.ground?.name}</td>
                                            <td className="p-3">{slot.startTime} </td>
                                            <td className="p-3">{slot.endTime} </td>
                                            <td className="p-3">{slot.price} </td>

                                            <td className="p-3">{slot.isBooked ? "completed" : "pending"} </td>
                                            <td className="p-3">{slot.bookedBy?.userName || "Not Booked"} </td>
                                            <td className="p-3">{slotDate} </td>
                                            <td className="p-3 text-right">

                                                <button onClick={() => handleDelete(slot._id)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }

                                )

                        }



                    </tbody>
                </table>

            </div>
            <div className=" mt-4 flex justify-center item-center">


                {
                    <button
                        onClick={handlePrevPage}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage == 1 ? "cursor-not-allowed opacity-50" : ""}`} >

                        Prev</button>
                }


                {pages.map((page, index) => {
                    return <button disabled={page == currentPage}
                        key={index}
                        onClick={() => { setCurrentPage(page) }}
                        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 ${page == currentPage ? "bg-red-500" : ""}`} >{page}

                    </button>

                })}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === pages.length}
                    className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentPage === pages.length ? "cursor-not-allowed opacity-50" : ""}`}
                >
                    Next
                </button>



            </div>

        </div>

    );
}

export default AdminSlot;
