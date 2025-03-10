import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const UserManagement = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {


            setLoading(true)
            const response = await axios.get("http://localhost:3000/api/users", {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data)
            setUsers(response.data.data)
        } catch (error) {
            console.error("Error in fetching users", error)
        } finally {
            setLoading(false)
        }
    }


    const handleDeleteUser = async (id) => {
        if (!id) return
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
                await axios.delete(`http://localhost:3000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUsers(users.filter(user => user._id !== id))
                Swal.fire({
                    icon: 'success',
                    title: 'User Deleted',
                    text: 'The user has been deleted successfully.',
                    showConfirmButton: false,
                    timer: 1000,
                })


            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "User Deletion failed",
                    text: error.response?.data?.message || 'Error in deleting user. Please try again.'
                })
            }
        }






    }


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone Number</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border p-2">{user?.userName || "N/A"}</td>
                                <td className="border p-2">{user?.userEmail || "N/A"}</td>
                                <td className="border p-2">
                                    {user?.userPhoneNumber}
                                </td>
                                <td className="border p-2">
                                    {user?.role}
                                </td>

                                <td className="flex justify-center space-x-7 border p-2">


                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
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
    )
}

export default UserManagement