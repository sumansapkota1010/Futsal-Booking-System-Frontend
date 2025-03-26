import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlots } from "../redux/slice/slots";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../redux/slice/bookings";
import { format } from "date-fns";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const BookingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slots, isLoading, error } = useSelector((state) => state.slots);
    const { loading: bookingLoading, error: bookingError } = useSelector((state) => state.bookings);

    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [loadingSlotId, setLoadingSlotId] = useState(null);

    useEffect(() => {
        dispatch(fetchSlots());
    }, [dispatch]);

    const handleBooking = async (slotId) => {
        const slot = filteredSlots.find((slot) => slot._id === slotId);
        if (!slot || !slot.ground) return;

        setLoadingSlotId(slotId);
        try {
            const bookingResponse = await dispatch(
                createBooking({ ground: slot.ground._id, slot: slotId })
            ).unwrap();

            if (bookingResponse?.data?._id) {
                navigate(`/checkout`, {
                    state: { bookingId: bookingResponse.data._id, amount: slot.price },
                });
            }
        } catch (error) {
            console.error("Booking failed:", error);
        } finally {
            setLoadingSlotId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-red-500">No Slots Available</h3>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredSlots = slots.filter((slot) => {
        const slotDate = new Date(slot.date);
        slotDate.setHours(0, 0, 0, 0);
        return slotDate >= today && format(slotDate, "yyyy-MM-dd") === selectedDate;
    });

    const futureSlots = filteredSlots.map((slot) => {
        const currentDateTime = new Date();
        const slotDate = new Date(slot.date);
        const startTime = new Date(`${slotDate.toISOString().split('T')[0]} ${slot.startTime}`);
        return { ...slot, isPastSlot: startTime < currentDateTime };
    });

    const uniqueGrounds = [...new Set(futureSlots.map((slot) => slot.ground?.name))];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Futsal Slot</h1>
                    <p className="text-gray-600">Select a date and time that works for you</p>
                </div>

                {/* Date Picker */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-md mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <FaCalendarAlt className="text-blue-600 text-xl" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                min={format(new Date(), "yyyy-MM-dd")}
                            />
                        </div>
                    </div>
                </div>

                {/* Available Grounds */}
                {uniqueGrounds.length > 0 ? (
                    <div className="space-y-8">
                        {uniqueGrounds.map((ground) => {
                            const groundSlots = futureSlots.filter((slot) => slot.ground?.name === ground);
                            return (
                                <div key={ground} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <h2 className="text-xl font-semibold text-gray-900">{ground}</h2>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                        {groundSlots.map((slot) => (
                                            <div
                                                key={slot._id}
                                                className={`border rounded-lg p-5 transition-all duration-200 ${slot.isBooked || slot.isPastSlot ? "bg-gray-50" : "hover:shadow-md"}`}
                                            >
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <FaClock className={`text-lg ${slot.isBooked || slot.isPastSlot ? "text-gray-400" : "text-blue-500"}`} />
                                                    <span className={`font-medium ${slot.isBooked || slot.isPastSlot ? "text-gray-500" : "text-gray-900"}`}>
                                                        {slot.startTime} - {slot.endTime}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${slot.isBooked ? "bg-red-100 text-red-800" : slot.isPastSlot ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"}`}>
                                                        {slot.isBooked ? "Booked" : slot.isPastSlot ? "Expired" : "Available"}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-900">Rs. {slot.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleBooking(slot._id)}
                                                    disabled={slot.isBooked || slot.isPastSlot || loadingSlotId === slot._id}
                                                    className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${slot.isBooked || slot.isPastSlot
                                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                                        }`}
                                                >
                                                    {loadingSlotId === slot._id ? (
                                                        <span className="flex items-center justify-center">
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        "Book Now"
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No available grounds</h3>
                        <p className="text-gray-600">There are no available grounds for the selected date</p>
                    </div>
                )}

                {bookingError && (
                    <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{bookingError}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;