import axios from 'axios'
import React, { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import Swal from 'sweetalert2';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({

            ...formData, [e.target.name]: e.target.value,
        }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("token")) {
            try {
                setIsLoading(true)
                const response = await axios.post("http://localhost:3000/api/contact", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                Swal.fire({
                    icon: "success",
                    title: "Message sent successfully",
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })


            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Sending message failed",
                    text: error.response?.data?.message || 'Send Message Unsuccessful. Please  try again.'
                })
            } finally {
                setIsLoading(false)
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Cannot send message without Login",
                text: 'Please Login to send Message '
            })
        }



    }


    return (
        <div className="flex items-center justify-center min-h-screen  bg-[#E5E5E5]  px-4">
            <div className="w-full max-w-4xl bg-[#31942C]  backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-gray-300 text-center mb-8">
                    Have questions? Reach out to us and book your futsal game today!
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <FaPhoneAlt className="text-yellow-400 text-xl" />
                            <span className="text-white text-lg">+977-9840300084</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="text-yellow-400 text-xl" />
                            <span className="text-white text-lg">sumansapkota777@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                            <span className="text-white text-lg">Kathmandu, Nepal</span>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name='subject'
                                onChange={handleChange}
                                value={formData.subject}
                                placeholder="Your Subject"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="mb-4">

                            <textarea
                                rows="4"
                                name='message'
                                onChange={handleChange}
                                value={formData.message}
                                placeholder="Your Message"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            ></textarea>
                        </div>

                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition">
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Contact