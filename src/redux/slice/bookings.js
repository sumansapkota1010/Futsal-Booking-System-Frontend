import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ ground, slot }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://futsalbookingsystem.onrender.com/api/createbooking",
        { ground, slot },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "An error occurred" }
      );
    }
  }
);

// Async thunk to initiate Khalti payment
export const initiateKhaltiPayment = createAsyncThunk(
  "bookings/initiateKhaltiPayment",
  async ({ bookingId, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://futsalbookingsystem.onrender.com/api/payment/${bookingId}`,
        { bookingId, amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("🚀 ~ response:", response.data);
      return response.data; // Contains payment_url and pidx
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "An error occurred" }
      );
    }
  }
);
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    payment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        if (action.payload) {
          state.bookings.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create booking";
      })

      // Handle initiateKhaltiPayment
      .addCase(initiateKhaltiPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateKhaltiPayment.fulfilled, (state, action) => {
        console.log("createBooking fulfilled payload:", action.payload);
        if (action.payload) {
          state.payment = action.payload; // Store payment details
        }
        state.loading = false;
      })
      .addCase(initiateKhaltiPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to initiate payment";
      });
  },
});
export default bookingSlice.reducer;
