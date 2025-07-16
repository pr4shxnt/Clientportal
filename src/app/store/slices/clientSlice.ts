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
  error: any;
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
}

//credentials is the interface for the credentials formdata

interface Credentials {
  username: string;
  password: string;
}

//login response is the interface for clientdata state and function returning payload.

interface ClientLogin {
  name: string;
  email: string;
  username: string;

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
    name: '',
    email: '',
    username: '',
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
        } catch (error:any) {
            return ThunkAPI.rejectWithValue(error.data?.message || "Login Failed.")
        }
    }
)

// verify authentication of client
// goes to backend with token id and return boolean value
// isAuthenticated manipulation is done with this function
// this function runs everytime a component is mounted

const checkAuth = createAsyncThunk(
    'verify/client',
    async(ssid:string, ThunkAPI) =>{
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/auth/verify`,
                ssid
            )
            return response.data.state;
        } catch (error:any) {
            return ThunkAPI.rejectWithValue(error.data?.message || "Login Failed.")
        }
    }
)

// logout handler for clients

const logoutClient = async () => {
    setTimeout(()=>{
        console.log("logging out")
    },3000)
}


const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers:{
  setIsAuthenticated: (state, action) => {
    state.isAuthenticated = action.payload;
  },
  setLoading: (state, action)=>{
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
        state.error = action.payload || "Login failed.";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginClient.pending, (state)=>{
        state.error = null;
        state.loading = true;
        state.isAuthenticated = false;
      })
  }
});

export const { setIsAuthenticated, setLoading } = clientSlice.actions;
export default clientSlice.reducer;
