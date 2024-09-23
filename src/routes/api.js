import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("hello from router");
    res.send(`Welcome to Personal-Finance`);
});

export default router;
