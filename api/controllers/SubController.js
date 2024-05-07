import {Sub} from "../models/SubModel.js";

export const getSubs = async (req, res) => {
    try {
        const subs = await Sub.find();
        return res.status(200).json(subs);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({message: "Couldn't fetch subs."})
    }
}

export const getSub = async (req, res) => {
    try {
        const {subName} = req.params;
        const sub = await Sub.findOne({name:{$eq: subName}});
        
        return res.status(200).json(sub);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({message: "Couldn't fetch sub."})
    }
}