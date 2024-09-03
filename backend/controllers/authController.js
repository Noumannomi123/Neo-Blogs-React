import createSecretToken from "../utils/secretToken.js";
import bcrypt from "bcrypt";
import { db } from "../index.js";
const saltRounds = 10;
const Signup = async (req, res, next) => {
    try {
        const { email, username } = req.body;
        const password = String(req.body.password);
        const existingUser = await db.query("SELECT id FROM users WHERE username = $1", [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
            }
            else {
                const user = await db.query("INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *", [username, hash, email]);
                const token = createSecretToken(user.rows[0].id);
                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false
                });
                res.status(201).json({ message: "User created successfully", success: true, user: user.rows[0] });
                next();
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const Login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const password = String(req.body.password);
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        const match = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!match) {
            return res.status(400).json({ message: "Incorrect password or email." });
        }
        const token = createSecretToken(user.rows[0].id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({ message: "User logged in successfully", success: true, user: user.rows[0] });
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default Signup;
export { Login };