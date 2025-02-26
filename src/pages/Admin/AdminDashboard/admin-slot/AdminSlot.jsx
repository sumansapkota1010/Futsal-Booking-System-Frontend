import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSlot = () => {
    const [slots, setSlots] = useState([]);
    const navigate = useNavigate()


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
                console.error("Error fetching slots:", error);
            }
        };
        fetchSlots();
    }, []);

    const handleDelete = async (id) => {
        if (!id) return

        try {
            await axios.delete(`http://localhost:3000/api/slot/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setSlots(slots.filter(slot => slot._id !== id))

        } catch (err) {
            console.log("Error in deleting slots")
        }

    }


    const handleEdit = (id) => {


    };

    return (
        <div className="p-6  mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Slot Management</h1>




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
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slots.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center text-gray-500">No slots available</td>
                                </tr>
                            ) :
                                slots.map((slot, index) => (
                                    <tr key={slot._id} className={`border-b }`}>


                                        <td className="p-3">{slot.ground?.name}</td>
                                        <td className="p-3">{slot.startTime} </td>
                                        <td className="p-3">{slot.endTime} </td>
                                        <td className="p-3">{slot.price} </td>

                                        <td className="p-3">{slot.isBooked ? "completed" : "pending"} </td>
                                        <td className="p-3">{slot.bookedBy?.userName || "Not Booked"} </td>




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
    );
}

export default AdminSlot;
