const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

console.log(process.env.MONGO_URL);

const Database = require("../classes/Database.js");

const database = new Database(process.env.MONGO_URL);

app.use(bodyParser.urlencoded({ extended: true })); 


//All Users Information Route
router.post("/getUser", (req, res) => {
    let email = req.body;
    res.send(email);
});

module.exports = router;