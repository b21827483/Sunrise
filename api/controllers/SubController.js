import {Sub} from "../models/SubModel.js";

export const getSubs = async (req, res) => {
    try {
        const newSub = new Sub({
            name: "pooryou",
        })
        const subs = await Sub.find();
        console.log(subs)
        return res.status(200).json(subs);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({message: "Couldn't fetch subs."})
    }
}