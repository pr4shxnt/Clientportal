'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ---------------- Utility ----------------
// verify jwt token expiration
export const isTokenExpired = (jwtToken: string): boolean => {
  try {
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

// ---------------- Types ----------------
export interface Credentials {
  username: string;
  password: string;
}

export interface ClientLogin {
  _id: string;
  name: string;
  email: string;
  username: string;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ClientState {
  clientData: ClientLogin;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
}

interface loginResponse {
  clientData: ClientLogin;
  token: string;
  status: string;
}

// ---------------- Initial State ----------------
const initialState: ClientState = {
  clientData: {
    _id: "",
    name: "",
    email: "",
    username: "",
    profilePhoto: null,
    createdAt: "",
    updatedAt: "",
  },
  error: "",
  token: "",
  loading: false,
  isAuthenticated: false,
};

// ---------------- Async Thunks ----------------

// ✅ Login
export const loginClient = createAsyncThunk(
  "login/client",
  async (credentials: Credentials, ThunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/login`,
        credentials
      );

      localStorage.setItem("client_session", response.data.token);
      isTokenExpired(response.data.token);

      return response.data;
    } catch (error: unknown) {
      return ThunkAPI.rejectWithValue( (error as unknown as { data?: { message?: string } }).data?.message || 'Failed to fetch response');
    }
  }
);

// ✅ Get client details
export const getClientDetails = createAsyncThunk(
  "fetch/client",
  async (id: string, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      return ThunkAPI.rejectWithValue( (error as unknown as { data?: { message?: string } }).data?.message || 'Failed to fetch response');
    }
  }
);

// ✅ Update client details
export const updateClientDetails = createAsyncThunk(
  "update/client",
  async (
    { id, formData }: { id: string; formData: Partial<ClientLogin> },
    ThunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${id}`,
        formData
      );
      return response.data;
    }catch (error: unknown) {
      return ThunkAPI.rejectWithValue( (error as unknown as { data?: { message?: string } }).data?.message || 'Failed to fetch response');
    }
  }
);

// ---------------- Slice ----------------
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Login ---
      .addCase(
        loginClient.fulfilled,
        (state, action: PayloadAction<loginResponse>) => {
          state.clientData = action.payload.clientData;
          state.isAuthenticated = true;
          state.error = "";
          state.loading = false;
          state.token = action.payload.token;
        }
      )
      .addCase(loginClient.rejected, (state, action) => {
        state.error = typeof action.payload === "string" ? action.payload : "";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginClient.pending, (state) => {
        state.error = "";
        state.loading = true;
        state.isAuthenticated = false;
      })

      // --- Get Client ---
      .addCase(getClientDetails.fulfilled, (state, action) => {
        state.clientData = action.payload;
        state.error = "";
        state.loading = false;
      })
      .addCase(getClientDetails.rejected, (state, action) => {
        state.error = typeof action.payload === "string" ? action.payload : "";
        state.loading = false;
      })
      .addCase(getClientDetails.pending, (state) => {
        state.error = "";
        state.loading = true;
      })

      // --- Update Client ---
      .addCase(updateClientDetails.fulfilled, (state, action) => {
        state.clientData = action.payload;
        state.error = "";
        state.loading = false;
      })
      .addCase(updateClientDetails.rejected, (state, action) => {
        state.error = typeof action.payload === "string" ? action.payload : "";
        state.loading = false;
      })
      .addCase(updateClientDetails.pending, (state) => {
        state.error = "";
        state.loading = true;
      });
  },
});

export const { setIsAuthenticated, setLoading } = clientSlice.actions;
export default clientSlice.reducer;
