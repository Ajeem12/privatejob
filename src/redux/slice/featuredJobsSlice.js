import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// 🔄 Async thunk to fetch featured jobs
export const fetchFeaturedJobs = createAsyncThunk(
  'featuredJobs/fetchFeaturedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('features_jobs');
      return response.data.data; // assumed to be an array of jobs
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🌟 Featured Jobs Slice
const featuredJobsSlice = createSlice({
  name: 'featuredJobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFeaturedJobs: (state) => {
      state.jobs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchFeaturedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeaturedJobs } = featuredJobsSlice.actions;
export default featuredJobsSlice.reducer;
