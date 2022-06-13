const express = require("express");
const router = express.Router();
const app = express();
const port = 3000;

const apiRouter = require("./routes/api.js");

const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
  }));
app.use("/api", apiRouter);
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
    console.log(`Intern Hub listening at http://localhost:${port}`)
});