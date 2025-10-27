import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// POST: Apply to a job
export const applyToJob = createAsyncThunk(
  'jobs/applyToJob',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/applyjob', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// GET: All applied jobs (no ID needed)
export const getAppliedJobs = createAsyncThunk(
  'jobs/getAppliedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('jobseeker/appliedjob');
      return response.data; // Adjust if API nests data inside a field
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const applyJobSlice = createSlice({
  name: 'jobs',
  initialState: {
    appliedJobs: [],
    appliedJobsLoading: false,
    appliedJobsError: null,

    applyStatus: null,
    applyLoading: false,
    applyError: null,
  },
  reducers: {
    resetApplyStatus: (state) => {
      state.applyStatus = null;
      state.applyError = null;
    },
  },
  extraReducers: (builder) => {
    // POST apply to job
    builder
      .addCase(applyToJob.pending, (state) => {
        state.applyLoading = true;
        state.applyError = null;
        state.applyStatus = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.applyLoading = false;
        state.applyStatus = action.payload;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyError = action.payload;
      });

    // GET applied jobs
    builder
      .addCase(getAppliedJobs.pending, (state) => {
        state.appliedJobsLoading = true;
        state.appliedJobsError = null;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobsLoading = false;
        state.appliedJobs = action.payload;
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.appliedJobsLoading = false;
        state.appliedJobsError = action.payload;
      });
  },
});

export const { resetApplyStatus } = applyJobSlice.actions;

export default applyJobSlice.reducer;
