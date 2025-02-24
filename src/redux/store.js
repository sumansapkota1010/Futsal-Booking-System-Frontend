import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slice/slots";
import bookingReducer from "./slice/bookings";
import profileReducer from "./slice/profile";

export const store = configureStore({
  reducer: {
    slots: slotReducer,
    bookings: bookingReducer,
    profile: profileReducer,
  },
});
