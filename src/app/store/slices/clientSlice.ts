import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// interfaces declaration for typed safety
//ClientState is the interface for initialState of the data

interface ClientState {
  clientData: LoginResponse,
  error: any;
  loading: boolean;
  isAuthenticated: boolean;
}

//credentials is the interface for the credentials formdata

interface Credentials {
  username: string;
  password: string;
}

//login response is the interface for clientdata state and function returning payload.

interface LoginResponse {
  name: string;
  email: string;
  username: string;
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
  loading: false,
  isAuthenticated: false,
};


// login feature for the clients
// sends username and password as credentials in backend
// return payload such as basic information
// this runs one time login
// the token doesn't restore automatically
// we have to re-login after 7 days for safety

export const loginClient = createAsyncThunk(
    'login/client',
    async( credentials:Credentials ,ThunkAPI)=>{
        try {
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
                credentials
            )
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginClient.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.clientData = action.payload;
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

export const { } = clientSlice.actions;
export default clientSlice.reducer;
