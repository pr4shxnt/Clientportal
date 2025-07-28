import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of a project
export interface Project {
  _id: string;
  Name: string;
  Description: string;
}

export interface ProjectIndividual {
  Name: string;
  ClientId: string,
  Description: string,
  Cost: string | number;
  Discount: string | number;
  Revenue: string | number;
  isApproved: boolean;
  _id: string;
  Agreement: string;
  RepoName: string;
  RepoOwner: string;
  Completion: string;
  Deadline: string;
  createdAt: string;
  lastUpdated: string;
}

// Define the shape of a commit
export interface GitCommit {
  date: string;
  message: string;
  author?: string;
}

// Final state shape for the slice
interface ProjectState {
  gitData: Record<string, number> | string[]; // can be refined based on actual use
  gitCommits: Record<string, GitCommit> | string; // string if empty, otherwise commit map
  loading: boolean;
  projects: Project[];
  project: ProjectIndividual;
  error: string | null;
}

const initialState: ProjectState = {
  gitData: [],
  gitCommits: "",
  projects:[],
  loading: false,
  project: {
    Name: "",
    ClientId: "",
    Description: "",
    Cost: "",
    Discount: "",
    Revenue: "",
    isApproved: false,
    _id: "",
    Agreement: "",
    RepoName: "",
    RepoOwner: "",
    Completion: "",
    Deadline: "",
    createdAt: "",
    lastUpdated: ""
  },
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
    { repo, owner, createdAt, page }: { repo: string; owner: string; createdAt: string; page?: number },
    ThunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/commits`,
        {
          owner,
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
    { repo, owner, createdAt, page }: { repo: string; owner: string, createdAt: string; page?: number },
    ThunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/data`,
        {
          owner, // value should be passed dynamically to the thunk
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


export const getProjects = createAsyncThunk(
  'fetch/projects',
  async (token: string, ThunkAPI) => {
    try {
      if(!token) return console.log('no token')

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/${token}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return ThunkAPI.rejectWithValue(message);
    }
  }
);


export const getProjectByIdAndToken = createAsyncThunk(
  'fetch/project',
  async(projectId: string, ThunkAPI)=>{
    try {
      const token = localStorage.getItem('client_session')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client/projects/${projectId}/token/${token}`,
        {headers:{
          "Authorization" : `Bearer ${token}`
        }}
      )

      return response.data;
    } catch (error: unknown) {
const message = getErrorMessage(error);
      return ThunkAPI.rejectWithValue(message);
        }
  }
)


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
      })
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProjectByIdAndToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectByIdAndToken.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload[0];
        state.error = null;
      })
      .addCase(getProjectByIdAndToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default projectSlice.reducer;
