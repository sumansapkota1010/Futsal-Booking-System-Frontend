import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ContactManagement = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchContact()
    }, [])

    const fetchContact = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:3000/api/contact", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data)
            setContacts(response.data.data)


        } catch (error) {
            console.error("Error in fetching contact data", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Contacts</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Subject</th>
                            <th className="border p-2">Message</th>

                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="text-center">
                                <td className="border p-2">{contact?.name || "N/A"}</td>
                                <td className="border p-2">{contact?.email || "N/A"}</td>
                                <td className="border p-2">
                                    {contact?.subject}
                                </td>
                                <td className="border p-2">
                                    {contact?.message}
                                </td>



                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ContactManagement