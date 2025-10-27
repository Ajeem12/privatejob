import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axiosInstance';


export const submitApplicationWithoutReg = createAsyncThunk(
  "applicationWithoutReg/submit",
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/application_without_reg`,
        applicationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Submission failed"
      );
    }
  }
);

const applicationWithoutRegSlice = createSlice({
  name: "applicationWithoutReg",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetApplicationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplicationWithoutReg.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitApplicationWithoutReg.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitApplicationWithoutReg.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetApplicationState } = applicationWithoutRegSlice.actions;

export default applicationWithoutRegSlice.reducer;
