import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import UserRoutes from "./routes/UserRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8800, () => {
    console.log("Server is up and running");
} )