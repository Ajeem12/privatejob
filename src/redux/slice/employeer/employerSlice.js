import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from  '../../../utils/axiosEmployer'

// Get employer profile
export const fetchEmployerProfile = createAsyncThunk(
  'employer/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('employers/profile');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update employer profile
export const updateEmployerProfile = createAsyncThunk(
  'employer/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // profileData is expected to be a FormData instance
      const response = await axios.post('employers/update', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data', // optional: axios sets this automatically
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const employerSlice = createSlice({
  name: 'employer',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetEmployerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchEmployerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateEmployerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetEmployerState } = employerSlice.actions;
export default employerSlice.reducer;
