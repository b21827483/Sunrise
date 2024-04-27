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
    },
})     

export const {clearMessage} = authSlice.actions;

export default authSlice.reducer