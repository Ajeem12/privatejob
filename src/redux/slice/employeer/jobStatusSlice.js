import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../utils/axiosEmployer';

// 1. Async thunk to change job status
export const changeJobStatus = createAsyncThunk(
  "jobStatus/change",
  async ({ jobId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`applied_status_change`,
        { job_status: newStatus,applied_tbl_id:jobId }
      );
      return response.data; 
    } catch (err) {
      // Safely return error message
      return rejectWithValue(err.response?.data?.message || "Status update failed");
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  updatedJob: null
};

const jobStatusSlice = createSlice({
  name: "jobStatus",
  initialState,
  reducers: {
    resetJobStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.updatedJob = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeJobStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changeJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedJob = action.payload; // updated job data
      })
      .addCase(changeJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { resetJobStatus } = jobStatusSlice.actions;
export default jobStatusSlice.reducer;
