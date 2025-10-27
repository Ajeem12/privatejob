import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosEmployer';


// Async thunk for searching candidates
export const searchCandidates = createAsyncThunk(
  'searchCandidate/searchCandidates',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(`search_candidate`, searchParams);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Candidate search failed');
    }
  }
);

const searchCandidateSlice = createSlice({
  name: 'searchCandidate',
  initialState: {
    loading: false,
    error: null,
    candidates: [],
  },
  reducers: {
    clearSearchState(state) {
      state.error = null;
      state.candidates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.candidates = [];
      })
      .addCase(searchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(searchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchState } = searchCandidateSlice.actions;

export default searchCandidateSlice.reducer;
