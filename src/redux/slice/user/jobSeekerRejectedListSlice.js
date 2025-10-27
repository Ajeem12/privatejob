// src/redux/slice/employeer/jobSeekerRejectedListSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';

// 🔄 Async thunk to fetch rejected job seekers
export const fetchRejectedJobSeekers = createAsyncThunk(
  'jobSeekers/fetchRejectedList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('jobseeker/rejected_list'); 
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);


const jobSeekerRejectedListSlice = createSlice({
  name: 'jobSeekerRejectedList',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetRejectedList: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRejectedJobSeekers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRejectedJobSeekers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRejectedJobSeekers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRejectedList } = jobSeekerRejectedListSlice.actions;

export default jobSeekerRejectedListSlice.reducer;
