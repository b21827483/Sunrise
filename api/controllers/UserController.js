import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {User} from "../models/UserModel.js";
import {Token} from "../models/Token.js";

dotenv.config();

export const addUser = async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

export const signIn = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const existingUser = await User.findOne({email: {$eq: email}});

        if (!existingUser) {
            return res.status(400).json({message: "Username and/or password is invalid."});
        }

        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Username and/or password is invalid."});
        }

        const accessToken = jwt.sign({id: existingUser.id, email: email}, process.env.SECRET_KEY, {
            expiresIn: "30s",
        });

        const refreshToken = jwt.sign({id: existingUser.id, email: email}, process.env.SECRET_KEY, {
            expiresIn: "1m"
        })

        const newToken = new Token({
            user: existingUser._id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });

        await newToken.save();

        res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, user: {user_id: existingUser._id, email: existingUser.email, username: existingUser.username, profilePic: existingUser.profilePic}})
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({message: "Error has occured during sign in process."});
    }
}

export const refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        const tokenExist = await Token.findOne({refreshToken: {$eq: refreshToken}});

        if (!tokenExist) {
            res.status(401).json({message: "Invalid token."});
        }

        const userExist = await User.findOne({_id: {$eq: tokenExist.user}});

        if (!userExist) {
            res.status(401).json({message: "Invalid token."});
        }   

        jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (Date.now() >= decoded.exp) {
                await tokenExist.deleteOne();
                return res.status(401).json({message: "Refresh token expired."})
            }
            else {
                const newAccesToken = jwt.sign({id: userExist._id, email: userExist.email}, process.env.SECRET_KEY, {
                    expiresIn: "30s",
                });

                res.status(200).json({accessToken: newAccesToken, refreshToken: tokenExist.refreshToken});
            }
        })
    }
    catch (err) {
        return res.status(500).json({message: "Error has occured while refreshing the token."})
    }
} 