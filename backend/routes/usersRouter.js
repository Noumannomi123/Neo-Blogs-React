import express from "express";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { db } from "../index.js";
import passport from "passport";
const saltRounds = 10;
const router = express.Router();

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
    res.status(500).send("Error during authenticating.")
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/user/checkAuth",
        failureRedirect: "/user/login",
    })
);

router.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (checkResult.rows.length > 0) {// user exists
            console.log("User exists.");
            res.redirect(`${req.baseUrl}/login`);
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
                        res.redirect("/");
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

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
export default router;