import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubPosts = createAsyncThunk("post/getSubPosts", async (subId, {rejectWithValue}) => {
    try {
        const response = await axios.get(`http://localhost:8800/posts/sub/${subId}`);
        return response.data;
    }
    catch (err) {
        rejectWithValue(err);
    }
})

const PostSlice = createSlice({
    name: "post",
    initialState: {
        posts:[],
        postError: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getSubPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.postError = null;
        }),
        builder.addCase(getSubPosts.rejected, (state, action) => {
            state.postError = action.payload;
            state.posts = null;
        })
    }
})

export default PostSlice.reducer;