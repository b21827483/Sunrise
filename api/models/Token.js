import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        expires: 60,
        default: Date.now,
    }
})

export const Token = mongoose.model("Token", TokenSchema);