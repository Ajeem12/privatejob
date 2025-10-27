// src/redux/slice/employer/jobDetailsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

export const fetchJobDetails = createAsyncThunk(
  'jobDetails/fetchJobDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/fetchjobId/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch job details');
    }
  }
);

const jobDetailsSlice = createSlice({
  name: 'jobDetails',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    clearJobDetails: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearJobDetails } = jobDetailsSlice.actions;
export default jobDetailsSlice.reducer;
