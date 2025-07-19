import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProjectState {
  gitData: Record<string, number> | Array<string>;
  gitCommits: Record<string, { date: string; message: string; author?: string }> | string;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  gitData: [],
  gitCommits: "",
  loading: false,
  error: null,
};

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: unknown }).response !== null &&
    "data" in (error as { response: { data?: unknown } }).response &&
    typeof (error as { response: { data?: unknown } }).response.data === "object" &&
    (error as { response: { data?: unknown } }).response.data !== null &&
    "message" in (error as { response: { data: { message?: unknown } } }).response.data
  ) {
    return String((error as { response: { data: { message: unknown } } }).response.data.message);
  }
  return "Fetching git status failed";
}

// Async thunk to fetch commit details
export const getCommitdetails = createAsyncThunk(
  'projects/getCommits',
  async (
    { repo, createdAt, page }: { repo: string; createdAt: string; page?: number },
    ThunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/commits`,
        {
          owner: "pr4shxnt",
          repo,
          createdAt,
          page
        }
      );
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const getCommitdata = createAsyncThunk(
  'projects/getCommitsData',
  async (
    { repo, createdAt, page }: { repo: string; createdAt: string; page?: number },
    ThunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/data`,
        {
          owner: "pr4shxnt",
          repo,
          createdAt,
          page
        }
      );
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommitdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommitdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.gitCommits = action.payload.commits;
        state.error = null;
      })
      .addCase(getCommitdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.gitData = [];
        state.gitCommits = "";
      })
      .addCase(getCommitdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommitdata.fulfilled, (state, action) => {
        state.loading = false;
        state.gitData = action.payload.data;
        state.error = null;
      })
      .addCase(getCommitdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.gitData = [];
        state.gitCommits = "";
      });
  },
});

export default projectSlice.reducer;
