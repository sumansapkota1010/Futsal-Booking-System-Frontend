import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSlots = createAsyncThunk("slots/fetchSlots", async () => {
  const response = await axios.get("http://localhost:3000/api/slot/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response.data.data);
  return response.data.data;
});

const slotSlice = createSlice({
  name: "slots",
  initialState: {
    slots: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state, action) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        console.log("action payload", state.slots);
        state.isLoading = false;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default slotSlice.reducer;
