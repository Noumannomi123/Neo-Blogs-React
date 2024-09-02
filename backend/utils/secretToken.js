import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 1 * 24 * 60 * 60, // 1 day in seconds
    })
}

export default createSecretToken;