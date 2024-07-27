import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";
import cors from "cors";
import blogRouter from "./routes/blogsRouter.js";
import userRouter from "./routes/usersRouter.js";
env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const PORT = process.env.PORT || 3000 ;

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // allow the frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // allow these methods
    allowedHeaders: ["Content-Type"], // allow these headers
}))

app.use("/user", userRouter);
app.use("/user/posts", blogRouter);

app.get("*", (req, res) => {
    res.json("Sorry, no defined endpoint exists for this route.");
});

console.log("Connected to database.");
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});