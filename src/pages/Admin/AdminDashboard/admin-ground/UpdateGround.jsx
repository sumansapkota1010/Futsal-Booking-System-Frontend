import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { groundSchema } from "../../../../schemas";

const UpdateGround = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: "",
        location: "",
        pricePerHour: "",
        groundImage: null,
        capacity: "",
        size: "",
        operatingHours: "",
        slots: [],
        reviews: [],
    });


    useEffect(() => {
        const fetchGround = async () => {
            try {
                const response = await axios.get(`https://futsalbookingsystem.onrender.com/api/singleground/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const ground = response.data.data;


                setInitialValues({
                    name: ground.name,
                    location: ground.location,
                    pricePerHour: ground.pricePerHour,
                    groundImage: ground.image,
                    capacity: ground.capacity,
                    size: ground.size,
                    operatingHours: ground.operatingHours,
                    slots: ground.slots,
                    reviews: ground.reviews,
                });
            } catch (error) {
                console.error("Error fetching ground:", error);
                alert("Failed to fetch ground data. Please try again.");
            }
        };

        fetchGround();
    }, [id]);

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
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
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
                const response = await axios.put(
                    `https://futsalbookingsystem.onrender.com/api/updateground/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Ground Update Successfull",
                        text: "The ground has been updated successfully",
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        navigate("/admin");

                    }, 1000);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Ground Updation Failed",
                    text: error.response?.data?.message || 'Group Updation Unsuccessfull. Please  try again.'
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
                    Update Ground
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


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300"
                    >
                        {isSubmitting ? "Updating..." : "Update Ground"}
                    </button>


                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateGround;