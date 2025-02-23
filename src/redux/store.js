import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slice/slots";
import bookingReducer from "./slice/bookings";

export const store = configureStore({
  reducer: {
    slots: slotReducer,
    bookings: bookingReducer,
  },
});
