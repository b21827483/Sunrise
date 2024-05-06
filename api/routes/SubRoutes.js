import express from "express";
import { getSubs } from "../controllers/SubController.js";

const routes = express.Router();

routes.get("/", getSubs);

export default routes