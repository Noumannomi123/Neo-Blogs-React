import express from "express";
const router = express.Router();

router.get("/all", (req, res) => {
    res.send("All Users");
});

router.post("/create", (req, res) => {
    res.send("Create a user");
});

router.put("/update/:id", (req, res) => {
    res.send("Update a user");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete a user");
});
export default router;