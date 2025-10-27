import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance'; // Adjust based on your project

// Async thunk to change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/jobseeker/changePassword', {
        old_password: oldPassword,
        new_password: newPassword,
          new_password_confirmation: confirmPassword,
      });

      return response.data; // You can return a success message or user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to change password.'
      );
    }
  }
);

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || 'Password changed successfully.';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred.';
      });
  },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
