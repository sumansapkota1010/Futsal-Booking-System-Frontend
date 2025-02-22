import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
    return (
        <div className="     flex items-center justify-center min-h-screen  bg-[#E5E5E5]  px-4">
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


                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        ></textarea>
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