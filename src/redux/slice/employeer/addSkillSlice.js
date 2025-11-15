import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axiosEmployer";

// POST request to add skill
export const addSkill = createAsyncThunk(
  "skills/addSkill",
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await axios.post("insert_skill", skillData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add skill"
      );
    }
  }
);

const initialState = {
  skill: null,
  loading: false,
  error: null,
};

const addSkillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    resetSkillState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skill = action.payload;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSkillState } = addSkillSlice.actions;
export default addSkillSlice.reducer;
