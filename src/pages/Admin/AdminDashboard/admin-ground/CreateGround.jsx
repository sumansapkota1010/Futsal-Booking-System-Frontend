import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { groundSchema } from "../../../../schemas";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const token = localStorage.getItem("token")
console.log("🚀 ~ token:", token)




const initialValues = {
    name: "",
    location: "",
    pricePerHour: "",
    groundImage: null,
    capacity: "",
    size: "",
    operatingHours: "",
    slots: [],
    reviews: [],
};

const CreateGround = () => {
    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
    } = useFormik({
        initialValues,
        validationSchema: groundSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            console.log("Submitting form data:", values);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("location", values.location);
            formData.append("pricePerHour", values.pricePerHour);
            formData.append("capacity", values.capacity);
            formData.append("size", values.size);
            formData.append("operatingHours", values.operatingHours);
            formData.append("slots", JSON.stringify(values.slots));
            formData.append("reviews", JSON.stringify(values.reviews));

            if (values.groundImage) {
                formData.append("groundImage", values.groundImage);
            }


            try {
                const response = await axios.post(
                    "http://localhost:3000/api/createground",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ground Created',
                        text: 'The ground has been created successfully.',
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
                    title: "Ground Creation Failed",
                    text: error.response?.data?.message || 'Ground creation Unsuccessful. Please try again.'
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
                    Create New Ground
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.name && errors.name && (
                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.location && errors.location && (
                            <div className="text-red-500 text-sm mt-1">{errors.location}</div>
                        )}
                    </div>

                    {/* Price Per Hour */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price Per Hour</label>
                        <input
                            type="number"
                            name="pricePerHour"
                            value={values.pricePerHour}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.pricePerHour && errors.pricePerHour && (
                            <div className="text-red-500 text-sm mt-1">{errors.pricePerHour}</div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="groundImage"
                            onChange={(event) => {
                                setFieldValue("groundImage", event.currentTarget.files[0]);
                            }}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.groundImage && errors.groundImage && (
                            <div className="text-red-500 text-sm mt-1">{errors.groundImage}</div>
                        )}
                    </div>

                    {/* Capacity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={values.capacity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.capacity && errors.capacity && (
                            <div className="text-red-500 text-sm mt-1">{errors.capacity}</div>
                        )}
                    </div>

                    {/* Size */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <input
                            type="text"
                            name="size"
                            value={values.size}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.size && errors.size && (
                            <div className="text-red-500 text-sm mt-1">{errors.size}</div>
                        )}
                    </div>

                    {/* Operating Hours */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
                        <input
                            type="text"
                            name="operatingHours"
                            value={values.operatingHours}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Operating Hours"
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        />
                        {touched.operatingHours && errors.operatingHours && (
                            <div className="text-red-500 text-sm mt-1">{errors.operatingHours}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300"
                    >
                        {isSubmitting ? "Creating..." : "Create Ground"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGround;
