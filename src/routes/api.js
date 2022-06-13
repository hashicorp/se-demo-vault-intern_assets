const express = require("express");
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
            res.send(err);
        }
        );
});

module.exports = router;