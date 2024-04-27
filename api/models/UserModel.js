import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "mod"],
        default: "user"
    },
    profilePic: {
        type: String,
        default: "https://forum.truckersmp.com/uploads/monthly_2020_03/imported-photo-202022.thumb.png.81943bfe1be32614be2b23043e189bd5.png"
    }
});

export const User = mongoose.model("User", UserSchema);