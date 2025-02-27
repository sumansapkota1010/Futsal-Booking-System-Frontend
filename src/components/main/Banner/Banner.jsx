import React from 'react'
import { useNavigate } from 'react-router-dom'


const Banner = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (localStorage.getItem("token")) {
            navigate("/bookings")
        } else {
            alert("Cannot book without login")
        }
    }

    return (
        <header className=" container mx-auto pt-[180px]  text-white py-20">
            <div  >
                <h1 className="text-[64px] font-bold mb-4 ">Welcome to Anfield Futsal</h1>
                <p className="text-[24px] px-2">Futsal: Where Every Pass Counts and Every Goal Tells a Story</p>
            </div>

            <button
                onClick={handleClick}

                className="bg-[#31942C] text-white text-[13px] font-poppins font-medium py-[12px] px-[55px] rounded-[22px] cursor-pointer inline-block mt-[20px]"
            >
                BOOK NOW
            </button>
        </header >
    )
}

export default Banner