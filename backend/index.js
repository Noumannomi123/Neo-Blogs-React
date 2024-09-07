import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";
import cors from "cors";
import blogRouter from "./routes/blogsRouter.js";
import userRouter from "./routes/usersRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const PORT = process.env.PORT || 3000;

const app = express();

// middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "https://neo-blogs-react.vercel.app",
            "https://neo-blogs.vercel.app",
            // local production.
            "https://neo-blogs-l9yrmavos-noumans-projects-919c94d2.vercel.app",
            "http://localhost:3001",
            "http://localhost:5173",
            "http://192.168.51.1:5173",
            "http://192.168.137.1:5173",
            "http://192.168.0.104:5173",
            "https://accounts.google.com",
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(cookieParser());

// routes
app.get("/", (req, res) => {
    res.json("Hello World");
})
app.use("/", authRouter);

app.use("/user", userRouter);
app.use("/user/blog", blogRouter);

app.get("*", (req, res) => {
    res.json(`User endpoint doens't exist for ${req.originalUrl}`);
});

db.connect((err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Connected to database");
    }
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
export { db };