import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

export const getApplicationsByJobId = createAsyncThunk(
  'application/getApplicationsByJobId',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`employers/postjob_details/${jobId}`);
      return response.data; // Return the complete API response
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }
  }
);

const initialState = {
  data: null, // Will store the complete API response
  loading: false,
  error: null
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    resetApplicationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationsByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationsByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the complete response
      })
      .addCase(getApplicationsByJobId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;