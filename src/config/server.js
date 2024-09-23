import express from "express";
import morgan from "morgan";
import "dotenv/config";
import apiRoutes from "./../routes/api.js";
const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(
    morgan(
        ":method :host :status :param[id] :res[content-length] - :response-time ms"
    )
);

morgan.token("host", function (req, res) {
    return req.hostname;
});

morgan.token("param", function (req, res, param) {
    return req.params[param];
});

app.use("/", apiRoutes);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
