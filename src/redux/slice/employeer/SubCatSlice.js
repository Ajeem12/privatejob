// skillsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Async Thunk for fetching skills
export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (payload, { rejectWithValue }) => {
    try {
      // If payload is provided, use POST request with category filter
      if (payload && payload.category_id) {
        const response = await axios.post(`${API_BASE_URL}/recordSubcategory`, {
          category_id: payload.category_id
        });
        return response.data;
      } 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for saving skill
export const saveSkill = createAsyncThunk(
  'skills/saveSkill',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/savesubcategory`, skillData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for updating skill
export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async ({ id, skillData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subcategoryupdate/${id}`, skillData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for getting a single skill by ID (for editing)
export const getSkillById = createAsyncThunk(
  'skills/getSkillById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subcategoryedit/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for handling skills
const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    items: [],
    loading: false,
    error: null,
    successMessage: '',
    currentSkill: null, // For storing the skill being edited
  },
  reducers: {
    resetSuccessMessage: (state) => {
      state.successMessage = '';
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Save Skill
      .addCase(saveSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(saveSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Skill saved successfully!';
        // Refresh the skills list after saving
        // The component will handle the refetch
      })
      .addCase(saveSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Skill
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Skill updated successfully!';
        state.currentSkill = null;
        // Refresh the skills list after updating
        // The component will handle the refetch
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Skill by ID
      .addCase(getSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSkill = action.payload;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccessMessage, resetErrorMessage, clearCurrentSkill } = skillsSlice.actions;

export default skillsSlice.reducer;