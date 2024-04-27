import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import Database from "./database.js";

import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

const db = new Database(process.env.MONGODB_URL);

db.connect().catch(err => {
    console.log(err);
})

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.use("/users", UserRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is up and running");
} )