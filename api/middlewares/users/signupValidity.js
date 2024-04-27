import {check ,validationResult} from "express-validator";
import {User} from "../../models/UserModel.js";

export const checkSignupValidty = [
    check("username")
        .isLength({min: 2})
        .withMessage("You must enter your name.")
        .trim()
        .custom((value, {req}) => {
            if (value.length < 3) {
                throw new Error("Name length must be at least 2 characters long.");
            }
            else if (value.length > 30) {
                throw new Error("Name lenght must not exceed 30 characters.")
            }
            else {
                return true;
            }
        }),
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address.")
        .custom(async (value, {req}) => {
            try {
                const isExist = await User.findOne({email: value});
                if (isExist) {
                    throw new Error("Entered email already registered to another user.")
                }
            } catch (e) {
                throw e;
            }
        }),
    check("password")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 character long."),
    check("role").default("user")
]

export const addUserValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();


    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res
            .status(400)
            .json({ errors: Object.values(mappedErrors).map((error) => error.msg) });
    }
};