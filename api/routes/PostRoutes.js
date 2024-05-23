import express from "express";
import { addPosts, getPosts } from "../controllers/PostController.js";

const routes = express.Router();

routes.get("/sub/:subId", getPosts)
routes.post("/sub/:subId", addPosts);

export default routes;