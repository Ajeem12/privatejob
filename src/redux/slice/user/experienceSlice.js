import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';



// Async thunks
export const addExperience = createAsyncThunk(
  'experience/addExperience',
  async (experienceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('add_experience', experienceData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateExperience = createAsyncThunk(
  'experience/updateExperience',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`update_experience/${id}`, data);
      return { id, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  'experience/deleteExperience',
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`delete_experience/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  experiences: [],
  loading: false,
  error: null,
};

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Experience
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.push(action.payload);
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Experience
      // .addCase(updateExperience.fulfilled, (state, action) => {
      //   const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
      //   if (index !== -1) {
      //     state.experiences[index] = action.payload.data;
      //   }
      // })
      .addCase(updateExperience.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateExperience.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
  if (index !== -1) {
    state.experiences[index] = action.payload.data;
  }
  state.successMessage = 'Experience updated successfully';
})

      // Delete Experience
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      });
  },
});

export default experienceSlice.reducer;
