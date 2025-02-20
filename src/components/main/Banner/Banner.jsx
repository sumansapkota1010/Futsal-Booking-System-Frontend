import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <header className=" container mx-auto pt-[180px]  text-white py-20">
            <div  >
                <h1 className="text-[64px] font-bold mb-4 ">Welcome to Anfield Futsal</h1>
                <p className="text-[24px] px-2">Futsal: Where Every Pass Counts and Every Goal Tells a Story</p>
            </div>
            <Link
                to="booknow"

                className="bg-[#31942C] text-white text-[13px] font-poppins font-medium py-[12px] px-[55px] rounded-[22px] cursor-pointer inline-block mt-[20px]"
            >
                BOOK NOW
            </Link>
        </header >
    )
}

export default Banner