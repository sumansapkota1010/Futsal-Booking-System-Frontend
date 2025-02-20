import React from 'react'
import court3 from '../../../assets/court/court3.png'

const AboutUs = () => {
    return (
        <>
            <section className=" py-20 bg-[#FCFCFC] overflow-hidden">
                <div className="container  mx-auto px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div className="relative group">
                            <img
                                src="https://images.unsplash.com/photo-1600679472829-3044539ce8ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Futsal Players"
                                className="rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500"></div>
                        </div>


                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-red-700">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Providing top-quality futsal facilities and promoting sports within the community. We strive to create an environment where players can develop their skills and enjoy the beautiful game.
                            </p>

                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-[#E5E5E5] overflow-hidden">
                <div className="container mx-auto px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div className="relative group">
                            <img
                                src={court3}
                                alt="Futsal Players"
                                className=" h-[500px] rounded-lg shadow-xl transform group-hover:scale-90 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500"></div>
                        </div>


                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-black-700">
                                Our Facilities
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Modern grounds with professional grass surface, modern lighting systems, comfortable changing rooms, and a welcoming cafeteria for players and spectators.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

        </>



    )
}

export default AboutUs