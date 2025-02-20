import React, { useState } from 'react'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const NavLinkClasses = "text-black hover:text-[#f5a425] active:text-[#f5a425] text-[14px] font-medium py-2 tracking-[1px] cursor-pointer";
    const NavLink = ({ href, children }) => (
        <a href={href} className={NavLinkClasses}>{children}</a>
    )
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    console.log(isOpen)
    return (
        <nav className="bg-[#E5E5E5] p-4 text-black">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Anfield Futsal</div>


                <div className="md:hidden" onClick={toggleMenu}>
                    <button className="text-black">
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        }
                    </button>
                </div>
                {isOpen && (
                    <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={toggleMenu}></div>
                )}


                {isOpen && (
                    <div className={`fixed top-0 right-0 h-full w-[250px] bg-[#E5E5E5] shadow-lg transform transition-transform duration-300 ease-in-out z-50 
                        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="  px-6 pt-4">
                            <button onClick={toggleMenu} className="text-black text-2xl">
                                &times;
                            </button>
                        </div>

                        <div className="  flex flex-col space-y-2  px-6 py-15 md:hidden">
                            <NavLink href="#">Home</NavLink>
                            <NavLink href="#">Our Ground</NavLink>
                            <NavLink href="#">Contact</NavLink>
                            <NavLink href="#">Register</NavLink>
                            <NavLink href="#">Login</NavLink>
                            <NavLink href="#">Admin Dashboard</NavLink>
                        </div>

                    </div>

                )}

            </div>
        </nav>
    )
}



export default NavBar