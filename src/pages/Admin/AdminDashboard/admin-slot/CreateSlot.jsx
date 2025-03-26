import { useFormik } from "formik";
import React from "react";
import { slotSchema } from "../../../../schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const initialValues = {
    ground: "",
    startTime: "",
    endTime: "",
    date: "",
    price: "",
};

const CreateSlot = () => {
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        initialValues,
        validationSchema: slotSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            console.log("Submitting form data:", values);

            try {
                const response = await axios.post(
                    "http://localhost:3000/api/createslot",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Slot Created',
                        text: 'The slot has been created successfully.',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    setTimeout(() => {
                        navigate("/admin");

                    }, 1000);
                    resetForm();
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Slot Creation Failed",
                    text: error.response?.data?.message || 'Slot creation Unsuccessful. Please try again.'
                })
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-600 tracking-wide">
                    Create New Slot
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Ground */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Ground ID
                        </label>
                        <input
                            type="text"
                            name="ground"
                            value={values.ground}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.ground && errors.ground && (
                            <div className="text-red-500 text-sm mt-1">{errors.ground}</div>
                        )}
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Start Time
                        </label>
                        <input
                            type="text"
                            name="startTime"
                            value={values.startTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.startTime && errors.startTime && (
                            <div className="text-red-500 text-sm mt-1">{errors.startTime}</div>
                        )}
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            End Time
                        </label>
                        <input
                            type="text"
                            name="endTime"
                            value={values.endTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.endTime && errors.endTime && (
                            <div className="text-red-500 text-sm mt-1">{errors.endTime}</div>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.date && errors.date && (
                            <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Price"
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.price && errors.price && (
                            <div className="text-red-500 text-sm mt-1">{errors.price}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300"
                    >
                        {isSubmitting ? "Creating..." : "Create Slot"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSlot;