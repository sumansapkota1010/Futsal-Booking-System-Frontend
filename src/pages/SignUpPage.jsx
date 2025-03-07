import React from 'react';
import photo from '../assets/court/photo.png';
import { useFormik } from 'formik';
import axios from 'axios';
import { signUpSchema } from '../schemas';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const response = await axios.post("https://futsalbookingsystem.onrender.com/api/register", values);
                console.log("Response from backend:", response.data.data);

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sign Up Successfull",
                        text: "You will be redirect to login page..",
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        navigate('/login');
                        resetForm();

                    }, 1000);
                } else {

                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.response?.data?.message || 'Sign Unsuccessful.'
                })
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">

                <div className="w-full md:w-1/2 p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                    <p className="text-gray-500 mb-5">Create your account</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">👤</span>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Name"
                                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {errors.name && touched.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">📧</span>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">📞</span>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Phone Number"
                                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-red-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-600 disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Submitting...' : 'REGISTER'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-4">
                        Already registered? <Link to="/login" className="text-red-500">Login</Link>
                    </p>
                </div>


                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6 md:p-0">
                    <img
                        src={photo}
                        alt="Football Player"
                        className="w-full h-auto object-cover drop-shadow-lg md:w-[509px] md:h-[649px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;