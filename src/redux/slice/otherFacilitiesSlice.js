
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosEmployer';

// Thunk to fetch other facilities
export const fetchOtherFacilities = createAsyncThunk(
  'otherFacilities/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/others_facilities');
      return response.data.data; // Expected to be an array
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch facilities');
    }
  }
);

const otherFacilitiesSlice = createSlice({
  name: 'otherFacilities',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherFacilities.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchOtherFacilities.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export default otherFacilitiesSlice.reducer;
