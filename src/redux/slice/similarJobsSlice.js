// src/redux/slice/similarJobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch similar jobs by job ID
export const fetchSimilarJobs = createAsyncThunk(
  'similarJobs/fetchSimilarJobs',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/similar_jobs/${jobId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch similar jobs');
    }
  }
);

const similarJobsSlice = createSlice({
  name: 'similarJobs',
  initialState: {
    similarJobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.similarJobs = action.payload;
      })
      .addCase(fetchSimilarJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default similarJobsSlice.reducer;
