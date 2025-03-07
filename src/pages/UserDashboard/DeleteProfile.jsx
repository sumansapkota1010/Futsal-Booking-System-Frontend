
import axios from 'axios'
import React, { useState } from 'react'

const DeleteProfile = () => {
    const [confirmDelete, setConfirmDelete] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (confirmDelete === "DELETE") {

                const response = await axios.delete("https://futsalbookingsystem.onrender.com/api/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }

                })
                alert("Profile Deleted successfully")
            } else {
                alert("Please type 'DELETE' to confirm ")
            }

        } catch (error) {
            console.error("Error in deleting profile", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className="text-center py-6">Loading...</div>;
    }


    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delete Profile</h2>
            <p className="text-sm text-gray-600 mb-4">
                Warning: This action is irreversible. Type "DELETE" to confirm.
            </p>
            <form onSubmit={handleSubmit} className='space-y-3' >
                <input
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
                    type="text"
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    placeholder='Type DELETE to confirm'
                    required
                />
                <button type="submit" className='w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition'>
                    Delete
                </button>


            </form>




        </div>
    )
}


export default DeleteProfile