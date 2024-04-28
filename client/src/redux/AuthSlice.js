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
    const {accessToken, user} = res.data;
    const userToken = {accessToken, user};
    localStorage.setItem("user", JSON.stringify(userToken));
    return userToken;
  }
  catch (err) {
    throw rejectWithValue(err.response.data.message);
  } 
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
      userInfo: null,
      accessToken: null,
      signInError: null,
      signUpError: [],  
      signUpSuccess: null,
      signInSuccess: null
  },
    reducers: {
      clearMessage: (state) => {
        state.signUpError = [];
        state.signInError = null;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(signUp.fulfilled, (state, action) => {
        state.signUpSuccess = "User has created successfully.";
        state.signUpError = [];
      })
      builder.addCase(signUp.rejected, (state, action) => {
        state.signUpError = action.payload;
      })

      builder.addCase(signIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.accessToken = action.payload.accessToken;
        state.signInSuccess = "Signed in successfully.";
        state.signInError = null;
      })
      builder.addCase(signIn.rejected, (state, action) => {
        state.userInfo = null;
        state.accessToken = null;
        state.signInError = action.payload;
        state.signInSuccess = null;
      })
    },
})     

export const {clearMessage} = authSlice.actions;

export default authSlice.reducer