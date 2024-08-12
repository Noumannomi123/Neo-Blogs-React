import express from "express";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import { db } from "../index.js";
import passport from "passport";
const saltRounds = 10;
const router = express.Router();
import env from "dotenv";
env.config();
router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.put("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link, pic } = req.body;
        const result = await db.query(
            "UPDATE user_profile SET username = $1, phone = $2, gender = $3, date_of_birth = $4, address = $5, facebook_link = $6, twitter_link = $7, instagram_link = $8, pic = $9 WHERE id = $10 RETURNING *",
            [name, phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link,pic, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User Profile Not Found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error updating user profile in the database.", error);
        res.status(500).json({ message: "Error updating user profile." });
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query(
            "SELECT id, email, username as name, phone, gender, date_of_birth, address, facebook_link, twitter_link, instagram_link,pic FROM user_profile WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User Profile Not Found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error fetching user profile from the database.", error);
        res.status(500).json({ message: "Error fetching user profile." });
    }
});

router.get("/checkAuth", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
            }
        })
    } else {
        res.json({ isAuthenticated: false });
    }
});

router.get("/all", (req, res) => {
    res.send("All Users");
});

router.get("/login", (req, res) => {
    res.status(401).send("Unauthorized.")
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) return next(err);
            res.redirect("/user/login");
        })
    })
})

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/user/checkAuth",
        failureRedirect: "/user/login",
    })
);

router.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = String(req.body.password);
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (checkResult.rows.length > 0) {// user exists
            console.log("User exists.");
            res.status(409).send("Duplicate user.");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password: ", err);
                } else {
                    const result = await db.query("INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
                        [email, hash]
                    );
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log("success");
                        res.redirect("/user/checkAuth")
                    });
                }
            })
        }
    } catch (error) {
        console.log("Error while registering the user.");
    }
});

router.put("/update/:id", (req, res) => {
    res.send("Update a user");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete a user");
});

passport.use(
    "local",
    new Strategy({
        usernameField: "email",// email
        passwordField: "password",// password"
    },
        async function verify(username, password, cb) {
            try {
                username = String(username).trim();
                password = String(password);
                const result = await db.query("SELECT * FROM users WHERE email = $1",
                    [username]
                );
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    const storedHashedPassword = user.password_hash;
                    bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                        if (err) {
                            console.error("Error comparing passwords:");
                            return cb(err);
                        } else {
                            if (valid) {
                                console.log("User authentication successful.");
                                return cb(null, user);
                            }
                            else {
                                console.log("Incorrect password.");
                                return cb(null, false);
                            }
                        }
                    });
                }
                else {
                    console.log("User not found.");
                    return cb("User not found.");
                }
            } catch (error) {
                console.log("Error while querying the user from database.");
            }
        })
)

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/user/checkAuth`,
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile);
                const result = await db.query("SELECT * FROM users WHERE email = $1", [
                    profile.email,
                ]);
                if (result.rows.length === 0) {
                    const newUser = await db.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2)",
                        [profile.email, "google"]
                    );
                    return cb(null, newUser.rows[0]);
                } else {
                    return cb(null, result.rows[0]);
                }
            } catch (err) {
                return cb(err);
            }
        }
    )
)

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
export default router;