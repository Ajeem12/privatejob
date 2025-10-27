import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

// ✅ Replace with your actual API endpoint
export const fetchRejectedList = createAsyncThunk(
  'rejectedList/fetchRejectedList',
  async (seekerId, thunkAPI) => {
    try {
      const response = await axios.get(`employeer_rejected_list`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch rejected list"
      );
    }
  }
);

const rejectedListSlice = createSlice({
  name: 'rejectedList',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    clearRejectedList: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRejectedList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRejectedList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRejectedList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRejectedList } = rejectedListSlice.actions;

export default rejectedListSlice.reducer;
