import express from "express";

import {addUser, signIn, refreshToken, getUser} from "../controllers/UserController.js";
import {addUserValidatorHandler, checkSignupValidty} from "../middlewares/users/signupValidity.js";

const routes = express.Router();

routes.get("/:userId", getUser);
routes.post("/signup", checkSignupValidty, addUserValidatorHandler, addUser);
routes.post("/signin", signIn);
routes.post("/refreshToken", refreshToken);

export default routes