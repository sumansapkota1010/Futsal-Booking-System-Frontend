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

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [selectedGround, setSelectedGround] = useState("");
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
            setLoadingSlotId(null)
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
        return <div className="text-center mt-8 text-red-500 font-semibold">No Slots Available</div>;
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)



    // Filter slots based on selected date
    const filteredSlots = slots.filter(
        (slot) => format(new Date(slot.date), "yyyy-MM-dd") === selectedDate
    );

    // future slots
    const futureSlots = filteredSlots.filter(slot => {
        const currentDateTime = new Date();


        const formattedCurrentDateTime = currentDateTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });

        console.log("Current Date Time:", currentDateTime);
        console.log("Formatted Time:", formattedCurrentDateTime);

        const slotDate = new Date(slot.date);


        const parseTime = (timeStr) => {
            if (!timeStr) return null;
            return new Date(`${slotDate.toISOString().split('T')[0]} ${timeStr}`);
        };

        const startTime = parseTime(slot.startTime);

        console.log("🚀 ~ BookingPage ~ startTime:", startTime);

        return startTime && startTime > currentDateTime;
    });


    console.log(futureSlots);;

    // Get unique grounds available for the selected date
    const uniqueGrounds = [...new Set(futureSlots.map((slot) => slot.ground.name))];

    return (
        <div className="max-w-4xl mx-auto p-6">

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Select Date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Display Available Grounds with their Slots in Table */}
            {uniqueGrounds.length > 0 ? (
                uniqueGrounds.map((ground) => {
                    const groundSlots = filteredSlots.filter((slot) => slot.ground.name === ground);

                    return (
                        <div key={ground} className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">{ground}</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 p-2">Start Time</th>
                                            <th className="border border-gray-300 p-2">End Time</th>
                                            <th className="border border-gray-300 p-2">Status</th>
                                            <th className="border border-gray-300 p-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groundSlots.length > 0 ? (
                                            groundSlots.map((slot) => (
                                                <tr key={slot._id} className="text-center">
                                                    <td className="border border-gray-300 p-2">{slot.startTime}</td>
                                                    <td className="border border-gray-300 p-2">{slot.endTime}</td>
                                                    <td
                                                        className={`border border-gray-300 p-2 ${slot.isBooked ? "text-red-500" : "text-green-500"
                                                            }`}
                                                    >
                                                        {slot.isBooked ? "Booked" : "Available"}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        <button
                                                            onClick={() => handleBooking(slot._id)}
                                                            disabled={slot.isBooked || loadingSlotId === slot._id}
                                                            className={`py-1 px-3 rounded text-white ${slot.isBooked
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-blue-500 hover:bg-blue-700"
                                                                }`}
                                                        >
                                                            {loadingSlotId === slot._id ? "Processing..." : "Book"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center text-gray-500 p-2">
                                                    No slots available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500">No available grounds for this date.</p>
            )}


            {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
        </div>
    );
};

export default BookingPage;
