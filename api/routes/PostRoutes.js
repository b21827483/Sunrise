import express from "express";
import { getPosts } from "../controllers/PostController.js";

const routes = express.Router();
routes.get("/sub/:subId", getPosts)

export default routes;