import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';


const baseUrl=import.meta.env.VITE_API_URL;

// Async thunk to fetch cities
export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  const response = await axios.get(`${baseUrl}/all_cities`);
  return response.data;  // Assuming your API response has a "data" field containing city list
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default citiesSlice.reducer;
