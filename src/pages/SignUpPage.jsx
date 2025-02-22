import React from 'react';
import player from '../assets/court/player.jpg';
import { useFormik } from 'formik';
import axios from 'axios';
import { signUpSchema } from '../schemas';


const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
};



const SignUpPage = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const response = await axios.post("http://localhost:3000/api/register", values);
                console.log("Response from backend:", response.data);
                console.log("Response")

                if (response.status === 200) {
                    alert("Registration successful!");
                    resetForm();
                } else {
                    alert("Registration failed. Please try again.");
                }
            } catch (error) {
                console.error("There is a problem with the registration:", error);
                if (error.response) {
                    alert(error.response.data.error || "Registration failed. Please try again.");
                } else {
                    alert("Network error. Please check your connection.");
                }
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
            <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 p-10">
                    <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                    <p className="text-gray-500 mb-5">Create your account</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">👤</span>
                            <input
                                type="text"
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Name"
                                className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-red-400"
                            />
                            {
                                errors.name && touched.name &&
                                <p className='form-error text-red-500'>{errors.name}</p>
                            }
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">📧</span>
                            <input
                                type="email"
                                name='email'
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
                                name='password'
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
                                name='phoneNumber'
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
                        Already registered? <a href="#" className="text-red-500">Login</a>
                    </p>
                </div>

                <div className="w-1/2 flex items-center justify-center bg-gray-50">
                    <img
                        src={player}
                        alt="Football Player"
                        className="w-full h-full object-cover drop-shadow-lg md:w-[509px] md:h-[649px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;