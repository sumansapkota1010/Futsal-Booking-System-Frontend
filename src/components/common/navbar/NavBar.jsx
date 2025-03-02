import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../redux/slice/profile';
import Swal from 'sweetalert2';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { profile, isLoading, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const NavLinkClasses =
        'text-black hover:text-[#f5a425] active:text-[#f5a425] text-[14px] font-medium py-2 tracking-[1px] cursor-pointer';


    useEffect(() => {
        if (localStorage.getItem("token")) {

            dispatch(fetchProfile());
        }
    }, [dispatch]);




    const NavLink = ({ to, children, isRouterLink, onClick }) => {
        if (isRouterLink) {
            return (
                <Link
                    to={to}
                    className={NavLinkClasses}
                    onClick={onClick}
                >
                    {children}
                </Link>
            );
        } else {
            return (
                <ScrollLink
                    to={to}
                    smooth={true}
                    duration={500}
                    className={NavLinkClasses}
                    onClick={onClick}
                >
                    {children}
                </ScrollLink>
            );
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        setIsOpen(false);
    };

    const profileData = profile.userName
    console.log(profile.role)

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
                        ) : (
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu}></div>
                )}

                {isOpen && (
                    <div
                        className={`fixed top-0 right-0 h-full w-[250px] bg-[#E5E5E5] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="px-6 pt-4">
                            <button onClick={toggleMenu} className="text-black text-2xl">
                                &times;
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2 px-6 py-15">
                            <NavLink to="home">Home</NavLink>
                            <NavLink to="our-grounds">Our Ground</NavLink>
                            <NavLink to="contact">Contact</NavLink>
                            {!localStorage.getItem("token") ? (
                                <div className='flex space-x-4'>
                                    <NavLink to="/register" isRouterLink>Register</NavLink>
                                    <NavLink to="/login" isRouterLink>Login</NavLink>
                                </div>
                            ) : (
                                <>
                                    <NavLink to="#" onClick={handleLogout}>Logout</NavLink>
                                    <p className='text-black hover:text-[#f5a425] active:text-[#f5a425] text-[14px] font-medium py-2 tracking-[1px] '>  Hello  {profileData}</p>
                                </>
                            )}

                            <NavLink to="/admin" isRouterLink>Admin Dashboard</NavLink>
                        </div>
                    </div>
                )}

                <div className="hidden md:flex space-x-6">
                    <NavLink to="home">Home</NavLink>
                    <NavLink to="our-grounds">Our Ground</NavLink>
                    <NavLink to="contact">Contact</NavLink>
                    {!localStorage.getItem("token") ? (
                        <div className='flex space-x-4'>
                            <NavLink to="/register" isRouterLink>Register</NavLink>
                            <NavLink to="/login" isRouterLink>Login</NavLink>
                        </div>
                    ) : (
                        <>
                            <NavLink to="#" onClick={handleLogout}>Logout</NavLink>

                        </>
                    )}
                    {
                        profile && profile.role === "player" ? (
                            <NavLink to="/user" isRouterLink>{profileData} Dashboard</NavLink>
                        ) : (
                            <NavLink
                                onClick={() => localStorage.getItem("token") ? navigate("/admin") : Swal.fire({
                                    icon: "error",
                                    title: " Admin Login Needed",
                                    text: ''
                                })}
                                isRouterLink


                            >
                                Admin Dashboard
                            </NavLink>
                        )
                    }






                </div>
            </div>
        </nav>
    );
};

export default NavBar;