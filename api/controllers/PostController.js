import {Post} from "../models/PostModel.js";

export const getPosts = async (req, res) => {
    try { 
        const {subId} = req.params;
        const posts = await Post.find({Sub: {$eq: subId}}).
            populate("User", "username profilePic");
            
        return res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({message: "Fetching posts failed."})
    }
}