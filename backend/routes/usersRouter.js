import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { db } from "../index.js";
import passport from "passport";
const saltRounds = 10;

router.use(passport.initialize());
router.use(passport.session());

router.get("/login", (req, res) => {
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

// router.post("/login", (req, res) => {
//     console.log(req.body);
//     res.sendStatus(200);
// });
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "An error occurred during authentication"
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "An error occurred during login"
                });
            }
            return res.json({
                success: true,
                isAuthenticated: true,
                user: {
                    id: user.id,
                    email: user.email,
                }
            });
        });
    })(req, res, next);
});

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