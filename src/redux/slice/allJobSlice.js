import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// POST: Fetch all jobs
export const fetchAllJobs = createAsyncThunk(
  'jobs/fetchAllJobs',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/all_job', postData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Failed to fetch jobs'
      );
    }
  }
);

// GET: Fetch job details by ID (public)
export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/job_details/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Failed to fetch job details'
      );
    }
  }
);

// ✅ POST: Fetch job details for logged-in users (private)
export const fetchJobDetailsLogin = createAsyncThunk(
  'jobs/fetchJobDetailsLogin',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/job_details_login/${jobId}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Failed to fetch job details (login)'
      );
    }
  }
);

const allJobSlice = createSlice({
  name: 'jobs',
  initialState: {
    loading: false,
    jobs: [],
    error: null,

    // For job details (public)
    jobDetailsLoading: false,
    jobDetails: null,
    jobDetailsError: null,

    // ✅ For job details (login)
    jobDetailsLoginLoading: false,
    jobDetailsLogin: null,
    jobDetailsLoginError: null,
  },
  reducers: {
    resetJobsState: (state) => {
      state.loading = false;
      state.jobs = [];
      state.error = null;

      state.jobDetailsLoading = false;
      state.jobDetails = null;
      state.jobDetailsError = null;

      // ✅ Reset login-based job details
      state.jobDetailsLoginLoading = false;
      state.jobDetailsLogin = null;
      state.jobDetailsLoginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Jobs
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data || action.payload || [];
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch jobs';
      })

      // Fetch Job Details (GET)
      .addCase(fetchJobDetails.pending, (state) => {
        state.jobDetailsLoading = true;
        state.jobDetailsError = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.jobDetailsLoading = false;
        state.jobDetails = action.payload.data || action.payload || null;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.jobDetailsLoading = false;
        state.jobDetailsError = action.payload || 'Failed to fetch job details';
      })

      // ✅ Fetch Job Details (POST - login)
      .addCase(fetchJobDetailsLogin.pending, (state) => {
        state.jobDetailsLoginLoading = true;
        state.jobDetailsLoginError = null;
      })
      .addCase(fetchJobDetailsLogin.fulfilled, (state, action) => {
        state.jobDetailsLoginLoading = false;
        state.jobDetailsLogin = action.payload.data || action.payload || null;
      })
      .addCase(fetchJobDetailsLogin.rejected, (state, action) => {
        state.jobDetailsLoginLoading = false;
        state.jobDetailsLoginError = action.payload || 'Failed to fetch job details (login)';
      });
  },
});

export const { resetJobsState } = allJobSlice.actions;

export default allJobSlice.reducer;
