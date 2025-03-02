import React from 'react'
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const Footer = () => {


    const handleClick = () => {
        localStorage.getItem("token") ? <Link to="/bookings"></Link> : Swal.fire({
            icon: "error",
            title: "Cannot book without Login",
            text: 'Please Login to Book Futsal Ground'
        })
    }


    return (
        <footer className="bg-green-800 text-gray-300 py-10">
            <div className="container  mx-auto px-6 lg:px-20">
                <div className="grid md:grid-cols-4 gap-8">


                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Anfield Futsal</h2>
                        <p className="text-sm">
                            Premium futsal facilities for everyone
                        </p>
                    </div>


                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-yellow-400" /> +977-9840300084
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-yellow-400" /> sumansapkota777@gmail.com
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-yellow-400" /> Kathmandu, Nepal
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                        <ul className="space-y-3">
                            <li><Link to="#" className="hover:text-yellow-400 transition">Home</Link></li>
                            <li onClick={handleClick} className="hover:text-yellow-400 transition">Bookings</li>
                            <li><Link to="/pricing" className="hover:text-yellow-400 transition">Pricing</Link></li>
                            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
                        </ul>

                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Opening Hours</h2>
                        <ul className="space-y-2 text-sm">
                            <li>Sunday: 6:00 AM - 10:00 PM</li>
                            <li>Monday: 6:00 AM - 10:00 PM</li>
                            <li>Tuesday: 6:00 AM - 10:00 PM</li>
                            <li>Wednesday: 6:00 AM - 10:00 PM</li>
                            <li>Thursday: 6:00 AM - 10:00 PM</li>
                            <li>Friday: 6:00 AM - 10:00 PM</li>
                            <li>Saturday: 6:00 AM - 10:00 PM</li>
                        </ul>
                    </div>
                </div>



                <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6">
                    <p className="text-sm">© {new Date().getFullYear()} Anfield Futsal. All rights reserved.</p>
                    <div className="flex gap-5 mt-4 md:mt-0">
                        <Link to="https://www.facebook.com/" className="text-gray-400 hover:text-yellow-400 transition">
                            <FaFacebookF size={18} />
                        </Link>
                        <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                            <FaTwitter size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer