import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

// ✅ Async thunk for feedback submission
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/feedback/feedback-entry-form`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Feedback submission failed" }
      );
    }
  }
);

// ✅ Slice for feedback form
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetFeedbackState: (state) => {
      state.feedback = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
        state.success = true;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
