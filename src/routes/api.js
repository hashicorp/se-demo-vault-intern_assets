const express = require("express");
const store = require("store2");
const router = express.Router();

const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

const Vault = require("../classes/Vault");
const vault = new Vault(1, 1);
const Database = require("../classes/Database.js");
const signale = require("signale");
const database = new Database(process.env.MONGO_URL);


// Login User
router.post("/login", (req, res) => {
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

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    vault.encryptText(password)
    .then((b64String) => {
        signale.info(b64String);
    })
    .catch((err) => {
        signale.error(err);
    })

    // database.createUser(username, password)
    //     .then((message) => {
    //         res.send({
    //             message: message
    //         });
    //     })
    //     .catch((err) => {
    //         store("Error", `${err}`);
    //         res.redirect("/api/error")
    //     }
    //     );
});

//Error Route
router.get("/error", (req, res) => {
    res.send({
        error: store("Error"),
    });
    store(false);
});

module.exports = router;