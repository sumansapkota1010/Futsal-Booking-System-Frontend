import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminGround = () => {
    const [grounds, setGrounds] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchGrounds = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getground");
                setGrounds(response.data.data);
            } catch (error) {
                console.error("Error fetching grounds:", error);
            }
        };
        fetchGrounds();
    }, []);

    const handleDelete = async (id) => {
        if (!id) return

        try {
            await axios.delete(`http://localhost:3000/api/deleteground/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setGrounds(grounds.filter(ground => ground._id !== id))

        } catch (err) {
            console.log("Error in deleting grounds")
        }

    }


    const handleEdit = (id) => {
        navigate(`/admin/${id}`)

    };

    return (
        <div className="p-6  mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Ground Management</h1>




            <div className="  bg-white shadow-md rounded-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-3 text-left">Ground Name</th>
                            <th className="p-3 text-left">Slots</th>
                            <th className="p-3 text-left">Capacity</th>
                            <th className="p-3 text-left">Size</th>
                            <th className="p-3 text-left">Price Per Hour</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            grounds.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center text-gray-500">No meetings available</td>
                                </tr>
                            ) :
                                grounds.map((ground, index) => (
                                    <tr key={ground._id} className={`border-b }`}>
                                        <td className="p-3">{ground.name}</td>
                                        <td className="p-3">{ground.slots.length} slots</td>
                                        <td className="p-3">{ground.capacity} Player</td>
                                        <td className="p-3">{ground.size} </td>
                                        <td className="p-3"><img src={ground.image} alt={ground.name} className="h-25" srcset="" /> </td>
                                        <td className="p-3">{ground.pricePerHour} </td>



                                        <td className="p-3 text-right">
                                            <button onClick={() => handleEdit(ground._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(ground._id)} className="text-red-500 hover:text-red-700">
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

export default AdminGround;
