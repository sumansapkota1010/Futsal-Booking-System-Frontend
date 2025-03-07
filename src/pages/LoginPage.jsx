import React from 'react';
import player from '../assets/court/player.jpg';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialValues = {
    email: "",
    password: ""
}



const LoginPage = () => {
    const navigate = useNavigate()

    const { values, handleChange, handleSubmit, errors, touched, handleBlur, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post("https://futsalbookingsystem.onrender.com/api/login", values)
                console.log("🚀 ~ onSubmit: ~ response:", response.data.token)
                if (response.status === 200) {
                    const { token } = response.data
                    localStorage.setItem("token", token)


                    const profileResponse = await axios.get("https://futsalbookingsystem.onrender.com/api/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    if (profileResponse.status === 200) {
                        const { role } = profileResponse.data.data

                        Swal.fire({
                            icon: "success",
                            title: "Login Successfull",
                            text: "You will be redirect to...",
                            timer: 1000,
                            timerProgressBar: true,
                            showConfirmButton: false
                        })

                        setTimeout(() => {
                            if (role === "admin") {
                                navigate("/admin")
                            } else {
                                navigate("/")
                            }
                        }, 1000)

                        console.log(profileResponse.data.data.role)
                    }
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.response?.data?.message || 'Login Unsuccessful. Please check your credentials and try again.'
                })
            } finally {
                setSubmitting(false)
            }

        }
    })

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">

                <div className="w-full md:w-1/2 p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">WELCOME BACK</h2>
                    <p className="text-gray-500 mb-6 text-sm md:text-base">
                        Welcome back! Please enter your details.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {
                                errors.email && touched.email &&
                                <p className='text-red-500 text-sm mt-1 '>{errors.email}</p>
                            }
                        </div>
                        <div>
                            <label className="text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="********"
                                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        {errors.password && touched.password &&
                            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>

                        }




                        <button className="w-full bg-red-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'LOGIN'}
                        </button>

                    </form>
                    <p className="text-center text-gray-500 mt-4">
                        Not registered?  <Link to="/register" className="text-red-500">Register</Link>
                    </p>

                    <div className="flex justify-center items-center text-sm text-gray-500 mt-5">
                        <Link to="/forgotpassword" className="text-red-400">Forgot password?</Link>
                    </div>

                </div>


                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6 md:p-0">
                    <img
                        src={player}
                        alt="Football Player"
                        className="w-full h-auto object-cover drop-shadow-lg md:w-[509px] md:h-[649px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;