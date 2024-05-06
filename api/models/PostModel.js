import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema({

    header: {
        type: String,
        required: true,
        trim: true,
    }, 
    content: {
        type: String,
        trim: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export const Post = mongoose.model("Post", PostSchema)