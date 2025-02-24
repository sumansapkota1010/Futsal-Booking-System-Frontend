import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlots } from "../redux/slice/slots";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../redux/slice/bookings";

const BookingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { slots, isLoading, error } = useSelector((state) => state.slots);
    const { loading: bookingLoading, error: bookingError, bookings } = useSelector(
        (state) => state.bookings
    );


    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        dispatch(fetchSlots());
    }, [dispatch]);

    const handleSlotClick = (slot) => {
        if (!slot.isBooked) {
            setSelectedSlot(slot);
        }
    };

    const handleBooking = async (slotId) => {
        const slot = slots.find((slot) => slot._id === slotId);
        if (!slot) return;

        const groundId = slot.ground._id;

        try {
            const bookingResponse = await dispatch(createBooking({ ground: groundId, slot: slotId })).unwrap();

            console.log("Booking Response:", bookingResponse);

            if (bookingResponse && bookingResponse.data && bookingResponse.data._id) {
                const bookingId = bookingResponse.data._id;
                const amount = slot.price;


                navigate(`/checkout`, {
                    state: { bookingId, amount },
                });
            } else {
                console.error("Unexpected response structure:", bookingResponse);
            }
        } catch (error) {
            console.error("Booking failed:", error);
        }

    };




    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Date</label>
                <input type="date" className="w-full p-2 border rounded" />
            </div>


            <div className="p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Available Time Slots
                </h2>
                <div className="grid grid-cols-4 gap-2">
                    {slots.map((slot) => (
                        <button
                            key={slot._id}
                            onClick={() => handleSlotClick(slot)}
                            className={`p-2 w-full text-center rounded-md 
                                ${slot.isBooked ? "bg-red-300 text-red-700 cursor-not-allowed" : "bg-green-300 hover:bg-green-400"} 
                                ${selectedSlot?._id === slot._id ? "border-2 border-blue-600" : ""}`}
                            disabled={slot.isBooked}
                        >
                            {slot.startTime} - {slot.endTime}
                        </button>
                    ))}
                </div>
            </div>


            {selectedSlot && (
                <div className="mt-4 p-2 bg-blue-100 rounded text-blue-700 font-medium">
                    Selected Slot: {selectedSlot.startTime} - {selectedSlot.endTime}
                    <br />
                    Ground: {selectedSlot.ground?.name}
                    <br />
                    Date: {new Date(selectedSlot.date).toLocaleDateString()}
                </div>
            )}
            <button
                onClick={() => handleBooking(selectedSlot._id)}
                disabled={!selectedSlot}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
                {bookingLoading ? "Processing..." : "Book Now"}
            </button>
            {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}

        </div>
    );
};

export default BookingPage;