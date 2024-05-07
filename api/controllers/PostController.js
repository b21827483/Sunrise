import {Post} from "../models/PostModel.js";

export const getPosts = async (req, res) => {
    try { 
        const posts = await Post.find();
        return res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({message: "Fetching posts failed."})
    }
}