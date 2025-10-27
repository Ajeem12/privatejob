import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

const initialState = {
  loading: false,
  error: null,
  success: null,
  job: null,
  jobs: [],
};

export const postJob = createAsyncThunk(
  'postJob/postJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post('post_job_employers', jobData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'postJob/updateJob',
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`update_jobs/${id}`, jobData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to update job',
        errors: error.response?.data?.errors || {},
      });
    }
  }
);

export const getJobs = createAsyncThunk(
  'postJob/getJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/all_job_list');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch jobs');
    }
  }
);

export const getJobById = createAsyncThunk(
  'postJob/getJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/fetchjobId/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch job details'
      );
    }
  }
);


const postJobSlice = createSlice({
  name: 'postJob',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
    },
    resetJobState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(postJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = 'Job posted successfully!';
        state.job = payload;
      })
      .addCase(postJob.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Update job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = 'Job updated successfully!';
        state.job = payload;
      })
      .addCase(updateJob.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobs = payload;
      })
      .addCase(getJobs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getJobById.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.job = null;
})
.addCase(getJobById.fulfilled, (state, { payload }) => {
  state.loading = false;
  state.job = payload.data || payload; 
})
.addCase(getJobById.rejected, (state, { payload }) => {
  state.loading = false;
  state.error = payload;
})

  },
});

export const { clearStatus, resetJobState } = postJobSlice.actions;
export default postJobSlice.reducer;
