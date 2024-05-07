import mongoose from "mongoose";

const SubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
   subPic: {
        type: String,   
    },
    banner: {
        type: String,
    },
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
        }
    ]
    ,
    joinedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
        }
    ],

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },]
})

SubSchema.index({name: "text"});

export const Sub = mongoose.model("Sub", SubSchema);