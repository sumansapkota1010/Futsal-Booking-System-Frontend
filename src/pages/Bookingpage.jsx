import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSlots } from "../redux/slice/slots";
import { createBooking } from "../redux/slice/bookings";

const BookingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch slots and booking state from Redux
    const { slots, loading, error } = useSelector((state) => state.slots);
    const { loading: bookingLoading, error: bookingError, bookings } = useSelector(
        (state) => state.bookings
    );

    useEffect(() => {
        dispatch(fetchSlots());
    }, [dispatch]);

    const handleBooking = async (slotId) => {
        const slot = slots.find((slot) => slot._id === slotId);
        if (!slot) return;

        const groundId = slot.ground._id;

        try {
            const bookingResponse = await dispatch(createBooking({ ground: groundId, slot: slotId })).unwrap();

            console.log("Booking Response:", bookingResponse); // Debugging log

            // Ensure the booking response contains the correct structure
            if (bookingResponse && bookingResponse.data && bookingResponse.data._id) {
                const bookingId = bookingResponse.data._id;
                const amount = slot.price;  // Use the slot's price as the amount

                // Navigate to checkout page with bookingId and amount
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

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center my-4">Available Slots</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                    <div key={slot._id} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                        <div className="font-bold text-xl mb-2">{slot.ground.name}</div>
                        <p className="text-gray-700 text-base">
                            {new Date(slot.date).toLocaleDateString()} - {slot.startTime} to {slot.endTime}
                        </p>
                        <p className="text-gray-900 text-xl">NPR {slot.price}</p>
                        <button
                            onClick={() => handleBooking(slot._id)}
                            disabled={bookingLoading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                        >
                            {bookingLoading ? "Processing..." : "Book Now"}
                        </button>
                        {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingPage;
