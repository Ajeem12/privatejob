// src/redux/slice/jobCategoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Thunk: Fetch all job categories
export const fetchJobCategories = createAsyncThunk(
  'jobCategories/fetchJobCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job_cat_all`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk: Add a new job category
export const addJobCategory = createAsyncThunk(
  'jobCategories/addJobCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/job_categories_post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk: Get single job category by ID
export const getJobCategoryById = createAsyncThunk(
  'jobCategories/getJobCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job_categories_edit/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk: Update job category by ID
export const updateJobCategory = createAsyncThunk(
  'jobCategories/updateJobCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/job_categories_update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const jobCategoriesSlice = createSlice({
  name: 'jobCategories',
  initialState: {
    items: [],
    loading: false,
    error: null,
    editCategory: null, // For storing a category being edited
  },
  reducers: {
    clearJobCategoryError(state) {
      state.error = null;
    },
    clearEditCategory(state) {
      state.editCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchJobCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchJobCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addJobCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJobCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addJobCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get by ID
      .addCase(getJobCategoryById.pending, (state) => {
        state.loading = true;
        state.editCategory = null;
      })
      .addCase(getJobCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.editCategory = action.payload;
      })
      .addCase(getJobCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update by ID
      .addCase(updateJobCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedItem = action.payload;
        const index = state.items.findIndex((item) => item.id === updatedItem.id);

        if (index !== -1) {
          state.items[index] = updatedItem;
        }

        state.editCategory = null;
      })
      .addCase(updateJobCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobCategoryError, clearEditCategory } = jobCategoriesSlice.actions;

export default jobCategoriesSlice.reducer;
