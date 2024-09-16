import express from "express";
const app = express();

const port = 3000;
app.use(express.json());

app.get("/", async (req, res) => {
    res.send(`Welcome to Personal-Finance`);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
