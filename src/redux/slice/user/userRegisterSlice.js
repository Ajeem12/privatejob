// src/redux/slice/userRegisterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
const baseUrl=import.meta.env.VITE_API_URL;


export const registerUser = createAsyncThunk(
  'userRegister/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/jobseekerreg`, formData);
      return response.data;
    } catch (error) {
      // Return full error data instead of just message string
      return rejectWithValue(error.response?.data || { message: 'User registration failed' });
    }
  }
);


const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
