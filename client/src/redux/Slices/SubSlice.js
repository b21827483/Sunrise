import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubInfo = createAsyncThunk("sub/getSubInfo", async (subName, {rejectWithValue}) => {
    try {
        const response = await axios.get(`http://localhost:8800/subs/${subName}`);
        return response.data;
    }   
    catch (err) {
        rejectWithValue(err.response.data.message)
    }
})

const SubSlice = createSlice({
    name: "sub",
    initialState: {
        subInfo: null,
        subError: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSubInfo.fulfilled, (state, action) => {
            state.subInfo = action.payload;
            state.subError = null;
        })
        builder.addCase(getSubInfo.rejected, (state, action) => {
            console.log(action.payload)
            state.subError = action.payload;
            subInfo = null;
        })
    }
})

export default SubSlice.reducer;