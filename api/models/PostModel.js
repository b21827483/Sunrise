import mongoose from "mongoose";

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
    Sub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sub",
        required: true,
    },
    likes: {
        type: Number,
        default: 0   
    },
    comments: [{
        type: String,
        default: []
    }]
})

export const Post = mongoose.model("Post", PostSchema)