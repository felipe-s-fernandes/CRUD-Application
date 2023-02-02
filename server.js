import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
