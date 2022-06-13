const express = require("express");
const session = require("express-session");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

const Database = require("../classes/Database.js");

const database = new Database(process.env.MONGO_URL);


//All Users Information Route
router.post("/getUser", (req, res) => {
    const email = req.body.email;
    database.findIntern(email)
        .then((user) => {
            res.send(user);
        }
        )
        .catch((err) => {
            req.session.error = err;
            console.log(req.session.error)
            console.log("Req Session Error from getUser: " + JSON.stringify(req.session));
            res.redirect("/api/error");
        });
});

//Error Route
router.get("/error", (req, res) => {
    console.log("req.session.error from error route: " + JSON.stringify(req.session));
    res.send(req.session.error);
});

module.exports = router;