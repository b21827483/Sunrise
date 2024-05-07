import express from "express";
import { getSub, getSubs } from "../controllers/SubController.js";

const routes = express.Router();

routes.get("/", getSubs);
routes.get("/:subName", getSub);

export default routes