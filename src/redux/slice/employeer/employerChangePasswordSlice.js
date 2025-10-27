import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

// Async thunk to handle API call
export const changePassword = createAsyncThunk(
  'employer/changePassword',
  async ({ old_password, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/employers/changePassword', {
        old_password,
        new_password,
       new_password_confirmation: confirm_password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password change failed');
    }
  }
);


const employerChangePasswordSlice = createSlice({
  name: 'employerChangePassword',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetChangePasswordState } = employerChangePasswordSlice.actions;

export default employerChangePasswordSlice.reducer;
