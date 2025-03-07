import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlots } from "../redux/slice/slots";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../redux/slice/bookings";
import { format } from "date-fns";

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
            setLoadingSlotId(null);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredSlots = slots.filter((slot) => {
        const slotDate = new Date(slot.date);
        slotDate.setHours(0, 0, 0, 0);
        return slotDate >= today && format(slotDate, "yyyy-MM-dd") === selectedDate;
    });

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Book Your Futsal Slot</h1>

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded shadow-md"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <p className="text-center text-red-500 font-semibold">No Slots Available</p>
            ) : filteredSlots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSlots.map((slot) => (
                        <div key={slot._id} className="p-4 bg-white shadow-lg rounded-xl text-center">
                            <h2 className="text-lg font-bold text-gray-800">{slot.ground.name}</h2>
                            <p className="text-gray-600">{slot.startTime} - {slot.endTime}</p>
                            <p className={`mt-2 font-semibold ${slot.isBooked ? "text-red-500" : "text-green-500"}`}>
                                {slot.isBooked ? "Booked" : "Available"}
                            </p>
                            <button
                                onClick={() => handleBooking(slot._id)}
                                disabled={slot.isBooked || loadingSlotId === slot._id}
                                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition-all ${slot.isBooked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
                            >
                                {loadingSlotId === slot._id ? "Processing..." : "Book Now"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No available slots for this date.</p>
            )}

            {bookingError && <p className="text-red-500 mt-2 text-center">{bookingError}</p>}
        </div>
    );
};

export default BookingPage;
