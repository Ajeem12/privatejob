import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance'; // custom axios instance

// Async thunk to fetch top hiring data using axios
export const fetchTopHiring = createAsyncThunk(
  'topHiring/fetchTopHiring',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('top_hiring_company');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch top hiring data'
      );
    }
  }
);

const topHiringSlice = createSlice({
  name: 'topHiring',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearTopHiring(state) {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHiring.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopHiring.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTopHiring.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearTopHiring } = topHiringSlice.actions;

export default topHiringSlice.reducer;
