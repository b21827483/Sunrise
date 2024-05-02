import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("auth/signup", async (signUpInfo, {rejectWithValue, fulfillWithValue}) => {
    await axios.post("http://localhost:8800/users/signup", signUpInfo).
    then((response) => {
      return fulfillWithValue(response.data.message);
    }).catch((err) => {
      throw rejectWithValue(err.response.data.errors)
    })
})

export const signIn = createAsyncThunk("/auth/signin", async (signInInfo, {rejectWithValue}) => {
  try {
    const res = await axios.post("http://localhost:8800/users/signin", signInInfo);
    const {accessToken, refreshToken, user} = res.data;
    const userToken = {accessToken, refreshToken, user};
    localStorage.setItem("user", JSON.stringify(userToken));
    return userToken;
  }
  catch (err) {
    throw rejectWithValue(err.response.data.message);
  } 
})

export const startAuth = createAsyncThunk("/auth/startAuth", async () => {
  try {
    const token = localStorage.getItem("user");
    const accessToken = JSON.parse(token)?.accessToken;
    const refreshToken = JSON.parse(token)?.refreshToken;
    const userInfo = JSON.parse(token)?.userInfo;
    if (accessToken && refreshToken) {
      return {accessToken, refreshToken, userInfo};
    } else {
      throw Error;
    }
  }
  catch (err) {
    throw err
  }
})

export const refreshTokenAction = createAsyncThunk("/auth/refreshToken", async (token) => {
  try {
    const res = axios.post("http://localhost:8800/users/refreshToken", {token});
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify({...user, ...res.data}));
    return response.data;
  }
  catch (err) {
    localStorage.removeItem("user");
    throw err.response.data.message;
  }
})

const initialState = {
  userInfo: null,
  accessToken: null,
  refreshToken: null,
  signInError: null,
  signUpError: [],  
  signUpSuccess: null,
  signInSuccess: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
      userInfo: null,
      accessToken: null,
      refreshToken: null,
      signInError: null,
      signUpError: [],  
      signUpSuccess: null,
      signInSuccess: null
    },
    reducers: {

      clearMessage: (state) => {
        state.signUpError = [];
        state.signInError = null;
      },

      logout: (state) => {
        state.userInfo = null,
        state.accessToken = null,
        state.refreshToken = null,
        state.signInError = null,
        state.signUpError = [],  
        state.signUpSuccess = null,
        state.signInSuccess = null
      }
    },
    extraReducers: (builder) => {
      builder.addCase(signUp.fulfilled, (state, action) => {
        state.signUpSuccess = "User has created successfully.";
        state.signUpError = [];
      })
      builder.addCase(signUp.rejected, (state, action) => {
        state.signUpError = action.payload;
        state.signUpSuccess = null;
      })

      builder.addCase(signIn.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.signInSuccess = "Signed in successfully.";
        state.signInError = null;
      })
      builder.addCase(signIn.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.signInError = action.payload;
        state.signInSuccess = null;
      })

      builder.addCase(startAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userInfo = action.payload.userInfo;
      })
      builder.addCase(startAuth.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.userInfo = null;
      })

      builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      builder.addCase(refreshTokenAction.rejected, (state, action) => {
        state.userInfo = null,
        state.accessToken = null,
        state.refreshToken = null,
        state.signInError = null,
        state.signUpError = [],  
        state.signUpSuccess = null,
        state.signInSuccess = null
      })
    },
})     

export const {clearMessage} = authSlice.actions;

export default authSlice.reducer