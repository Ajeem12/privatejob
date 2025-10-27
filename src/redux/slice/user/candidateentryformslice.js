import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

// Async thunk for candidate registration
export const registerCandidate = createAsyncThunk(
  "candidateRegister/registerCandidate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/candidate_entry_form`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Candidate entry failed" }
      );
    }
  }
);

const candidateRegisterSlice = createSlice({
  name: "candidateRegister",
  initialState: {
    candidate: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCandidateState: (state) => {
      state.candidate = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
        state.success = true;
      })
      .addCase(registerCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCandidateState } = candidateRegisterSlice.actions;
export default candidateRegisterSlice.reducer;
