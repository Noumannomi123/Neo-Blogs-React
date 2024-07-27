import express from "express";
const router = express.Router();

router.get("/all/:id", (req, res) => {
    res.send(`All posts for author ID: ${req.params.id}`);
});

router.post("/create/:id", (req, res) => {
    res.send("Create a book");
});

router.put("/update/:id", (req, res) => {
    res.send("Update a book");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete a book");
});

router.patch("/patch/:id", (req, res) => {
    res.send("Patch a book");
})

export default router;