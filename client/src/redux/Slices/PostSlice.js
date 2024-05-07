import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubPosts = createAsyncThunk("post/getSubPosts", async (subPostsInfo, {rejectWithValue}) => {
    try {
        const {subId} = subPostsInfo;
        const response = await axios.get(`http://localhost:8800/posts/sub/:${subId}`);
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
        savedPosts: [],
        postError: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getSubPosts.fulfilled, (state, action) => {
            state.posts.concat(action.payload.posts);
        }),
        builder.addCase(getSubPosts.rejected, (state, action) => {
            state.postError = action.payload;
        })
    }
})

export default PostSlice.reducer;