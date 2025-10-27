import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';

// Add Education
export const addEducation = createAsyncThunk(
  'education/addEducation',
  async (educationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('add_education', educationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add education');
    }
  }
);

// Update Education
export const updateEducation = createAsyncThunk(
  'education/updateEducation',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`update_education/${id}`, data);
      return { id, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update education');
    }
  }
);

// Delete Education
export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`delete_education/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to delete education');
    }
  }
);

const initialState = {
  educationList: [],
  loading: false,
  error: null,
  successMessage: null,
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    clearEducationMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educationList.push(action.payload);
        state.successMessage = 'Education added successfully';
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      // .addCase(updateEducation.fulfilled, (state, action) => {
      //   const index = state.educationList.findIndex(e => e.id === action.payload.id);
      //   if (index !== -1) {
      //     state.educationList[index] = action.payload.data;
      //     state.successMessage = 'Education updated successfully';
      //   }
      // })
      // .addCase(updateEducation.rejected, (state, action) => {
      //   state.error = action.payload;
      // })

      .addCase(updateEducation.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateEducation.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.educationList.findIndex(e => e.id === action.payload.id);
  if (index !== -1) {
    state.educationList[index] = action.payload.data;
  }
  state.successMessage = 'Education updated successfully';
})
      

      // Delete
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.educationList = state.educationList.filter(e => e.id !== action.payload);
        state.successMessage = 'Education deleted successfully';
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearEducationMessages } = educationSlice.actions;
export default educationSlice.reducer;
