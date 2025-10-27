// src/redux/slice/employee/employeeRegisterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

// POST employee registration
export const registerEmployee = createAsyncThunk(
  'employee/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('employers/reg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Registration failed'
      );
    }
  }
);

const employeeRegisterSlice = createSlice({
  name: 'employeeRegister',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRegisterState } = employeeRegisterSlice.actions;
export default employeeRegisterSlice.reducer;
