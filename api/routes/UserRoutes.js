import express from "express";

import {addUser} from "../controllers/UserController.js";
import {addUserValidatorHandler, checkSignupValidty} from "../middlewares/users/signupValidity.js";

const routes = express.Router();

routes.post("/signup", checkSignupValidty, addUserValidatorHandler, addUser);

export default routes