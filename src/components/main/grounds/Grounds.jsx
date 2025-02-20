import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Grounds = () => {
    const [grounds, setGrounds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchGrounds = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getground", {
                    withCredentials: true,
                })
                setGrounds(response.data.data)
                console.log(response.data.data[0].image)
            } catch (err) {
                setError("Failed to load grounds. Please try again ")
            } finally {
                setLoading(false)
            }
        }
        fetchGrounds()

    }, [])


    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-red-700 mb-8 uppercase tracking-wide">
                    Our Grounds
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Explore our high-quality futsal grounds designed for an excellent playing experience.
                </p>
                {loading && <p className="text-gray-700 text-lg">Loading...</p>}
                {error && <p className="text-red-600 text-lg">{error}</p>}


                <div className="grid md:grid-cols-2  gap-10">

                    {grounds.map((ground) => (

                        <div
                            key={ground._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={ground.image}

                                    alt={ground.name}
                                    className="w-full h-56 object-cover"
                                />

                                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                                    {ground.name}
                                </h3>
                            </div>

                            <div className="p-6 text-left">
                                <p className="text-gray-700">
                                    <strong>Location:</strong> {ground.location}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Size:</strong> {ground.size}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Capacity:</strong> {ground.capacity} players
                                </p>
                                <p className="text-gray-700">
                                    <strong>Price:</strong> Rs. {ground.pricePerHour} / hour
                                </p>
                                <p className="text-gray-700">
                                    <strong>Open:</strong> {ground.operatingHours.openTime} - {ground.operatingHours.closeTime}
                                </p>
                            </div>

                            <div className="p-4 bg-[#31942C] text-white text-center">
                                <button className="w-full py-2 rounded-md font-semibold  transition">
                                    Book Now
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}

export default Grounds