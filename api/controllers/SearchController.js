import { User } from "../models/UserModel.js";
import {Sub} from "../models/SubModel.js"

export const search = async (req, res) => {
    try {
        const searchKey = req.query.q;

        const users = await User.find(
            {$text: {$search: searchKey}},
            {score: {$meta: "textScore"}},
        ).select("_id username profilePic").sort({score: {$meta: "textScore"}});

    
        const subs = await Sub.find(
            {$text: {$search: searchKey}},
            {score: {$meta: "textScore"}},
        ).select("_id name subPic").sort({score: {$meta: "textScore"}});
        
        return res.status(200).json({users, subs});
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: "Search has failed."})
    }

}