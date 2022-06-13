import express from "express";
const router = express.Router();
const app = express();
const port = 3000;

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
});



// import "dotenv/config";
// import Database from "./classes/Database.js";
// const database = new Database(process.env.MONGO_URL);

// database.createIntern("Anthony", "Benjamin", "anthonyjbenjamin@gmail.com", "Pizza")
// .then(() => {
//     process.exit(1);
// });
// database.deleteIntern("anthonyjbenjamin@gmail.com");

// database.findIntern("anthonyjbenjamin@gmail.com")
// .then((intern) => {
//     console.log(intern);
// })
// .catch((err) => {
//     console.log(err);
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});