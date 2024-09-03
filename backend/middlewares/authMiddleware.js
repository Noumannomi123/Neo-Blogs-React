import env from "dotenv";
env.config();
import jwt from "jsonwebtoken";
import { db } from "../index.js";
const userVerification = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [data.id]);
            const user = result.rows[0];
            if (user) return res.json({ status: true, user: { id: user.id, email: user.email, username: user.username } });
            else return res.status(404).json({ status: false });
        }
    })
}

export { userVerification };