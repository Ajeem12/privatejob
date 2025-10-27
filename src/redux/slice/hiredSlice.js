
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;


export const fetchHiredPeople = createAsyncThunk(
  "hiredPeople/fetchHiredPeople",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/success-stories`);
    
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load success stories");
    }
  }
);

const hiredSlice = createSlice({
  name: "hiredPeople",
  initialState: {
    loading: false,
    success: false,
    error: null,
    hiredPeople: [], 
  },
  reducers: {
    clearHiredPeopleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.hiredPeople = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHiredPeople.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchHiredPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
       
        state.hiredPeople = Array.isArray(action.payload)
          ? action.payload
          : action.payload.data || [];
      })
      .addCase(fetchHiredPeople.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearHiredPeopleState } = hiredSlice.actions;
export default hiredSlice.reducer;
