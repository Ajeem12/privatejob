import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';


export const fetchJobSeekerProfile = createAsyncThunk(
  'jobSeeker/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('jobseeker/profile');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

export const editBio = createAsyncThunk(
  'jobSeeker/editBio',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('edit_bio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);



// Initial state
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const jobSeekerSlice = createSlice({
  name: 'jobSeeker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobSeekerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobSeekerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchJobSeekerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBio.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          aboutme: action.meta.arg, // use the sent bio as fallback
          ...action.payload // overwrite with fresh response if available
        };
      })
      .addCase(editBio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSeekerSlice.reducer;
