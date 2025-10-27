// src/redux/slice/dashboardCountSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

// Async thunk to fetch dashboard count
export const getDashboardCounts = createAsyncThunk(
  'dashboardCount/getDashboardCounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('employers/dashboardcountlist'); // Update API path if needed
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardCountSlice = createSlice({
  name: 'dashboardCount',
  initialState: {
    counts: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload?.data || {};
      })
      .addCase(getDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default dashboardCountSlice.reducer;
