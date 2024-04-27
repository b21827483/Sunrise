import bcrypt from 'bcrypt';

import {User} from "../models/UserModel.js";

export const addUser = async (req, res, next) => {
    console.log("add user")
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const role = "user";

    newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        if (newUser.isNew) {
            throw new Error("User has failed to register");
        }

        res.status(201).json({
            message: "User added successfully",
        });
    } catch (err) {
        res.status(400).json({
            message: "User has failed to register",
        });
    }
};
