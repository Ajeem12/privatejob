// redux/slice/job/jobWithoutRegSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from  '../../../utils/axiosEmployer'


export const fetchJobWithoutRegUser = createAsyncThunk(
  'jobWithoutReg/fetchById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`fetchjobIdWihoutRegUser/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const jobWithoutRegSlice = createSlice({
  name: 'jobWithoutReg',
  initialState: {
    job: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearJobData: (state) => {
      state.job = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobWithoutRegUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobWithoutRegUser.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(fetchJobWithoutRegUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearJobData } = jobWithoutRegSlice.actions;

export default jobWithoutRegSlice.reducer;
