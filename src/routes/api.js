const express = require("express");
const store = require("store2");
const router = express.Router();
const bodyParser = require("body-parser");

const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

const Database = require("../classes/Database.js");

const database = new Database(process.env.MONGO_URL);

// User Information Route
router.post("/getIntern", (req, res) => {
    const email = req.body.email;
    database.findIntern(email)
        .then((user) => {
            res.send(user);
        }
        )
        .catch((err) => {
            store("Error", `${err}`);
            res.redirect("/api/error")
            
        });
});

router.post("/createIntern", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const favoriteFood = req.body.favoriteFood;

    database.createIntern(firstName, lastName, email, favoriteFood)
        .then((message) => {
            res.send({
                message: message
            });
        })
        .catch((err) => {
            store("Error", `${err}`);
            res.redirect("/api/error")
        }
        );
});

//Error Route
router.get("/error", (req, res) => {
    res.send({
        error: store("Error"),
    });
    store(false);
});

module.exports = router;