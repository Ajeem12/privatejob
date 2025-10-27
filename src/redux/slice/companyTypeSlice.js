// src/redux/slice/master/companyTypeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Async thunk to fetch company types
export const fetchCompanyTypes = createAsyncThunk(
  'companyType/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/master/company-types');
      return response.data; // make sure this matches your actual response structure
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch company types');
    }
  }
);

const companyTypeSlice = createSlice({
  name: 'companyType',
  initialState: {
    types: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchCompanyTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companyTypeSlice.reducer;
