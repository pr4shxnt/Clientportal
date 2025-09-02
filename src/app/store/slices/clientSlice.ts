'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


// verify jwt token expiration
// parses payload using base64, checks if current time is greater than exp time
// doesn't touch localStorage (so it's SSR-safe)
export const isTokenExpired = (jwtToken: string): boolean => {
  try {
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    const currentTime = Date.now() / 1000;
    console.log(payload);

    return payload.exp < currentTime;
  } catch {
    return true;
  }
};



// interfaces declaration for typed safety
//ClientState is the interface for initialState of the data

interface ClientState {
  clientData: ClientLogin,
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
}

//credentials is the interface for the credentials formdata

export interface Credentials {
  username: string;
  password: string;
}

//login response is the interface for clientdata state and function returning payload.

interface ClientLogin {
  _id: string;
  name: string;
  email: string;
  username: string;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string;
}


// login response declaration

interface loginResponse {
  clientData: ClientLogin;
  token: string;
  status: string;
}

// initialState declaration 
// client data is typed safe

const initialState: ClientState = {
  clientData:{
    _id: "",
  name: "",
  email: "",
  username: "",
  profilePhoto: null,
  createdAt: "",
  updatedAt: "",
  },
  error: '',
  token: "",
  loading: false,
  isAuthenticated: false,
};


// login feature for the clients
// sends username and password as credentials in backend
// return payload such as basic information
// this runs one time login
// the token doesn't restore automatically
// we have to re-login after 30 days for safety

export const loginClient = createAsyncThunk(
    'login/client',
    async( credentials:Credentials ,ThunkAPI)=>{
        try {
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/login`,
                credentials
            )
          
              localStorage.setItem('client_session', response.data.token)
              isTokenExpired(response.data.token)
            return response.data;
        } catch (error:unknown) {
            return ThunkAPI.rejectWithValue((error as unknown as { data?: { message?: string } }).data?.message || "Login Failed.")
        }
    }
)

export const getClientDetails = createAsyncThunk(
  'fetch/client',
  async(token: any, ThunkAPI)=>{
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${token}`)

      return response.data;
    } catch (error:any) {
      return ThunkAPI.rejectWithValue(error.data.message || "Fetching client data failed")
    }
  }
)


const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers:{
  setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
    state.isAuthenticated = action.payload;
  },
  setLoading: (state, action: PayloadAction<boolean>)=>{
    state.loading = action.payload;
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(loginClient.fulfilled, (state, action: PayloadAction<loginResponse>) => {
        state.clientData = action.payload.clientData;
        state.isAuthenticated = true;
        state.error = '';
        state.loading = false;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : '';
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginClient.pending, (state)=>{
        state.error = '';
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(getClientDetails.fulfilled, (state, action:any) => {
        state.clientData = action.payload;
        state.error = '';
        state.loading = false;
      })
      .addCase(getClientDetails.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : '';
        state.loading = false;
      })
      .addCase(getClientDetails.pending, (state)=>{
        state.error = '';
        state.loading = true;
      })
  }
});

export const { setIsAuthenticated, setLoading } = clientSlice.actions;
export default clientSlice.reducer;
