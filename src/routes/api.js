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

router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        vault.encryptText(password)
            .then((result) => {
                console.log(result);
            });
    } catch(err) {
        signale.error(err);
    }
    // try {
    //     vault.encryptText(password)
    //     .then((cipherText) => {
    //         signale.info("CipherText: " + cipherText);
    //     })
    // } catch(err) {
    //     signale.error(err);
    // }
    

    // vault.encodeBase64(password)
    // .then((base64String) => {
    //     vault.encryptBase64(base64String)
    //     .then((cipherText) => {
    //         signale.info("Cipher Text: " + cipherText);
    //     })
    //     .catch((err) => {
    //         signale.error("Couldn't encrypt base64: " + err);
    //     })
    // })
    // .catch((err) => {
    //     signale.error("Couldn't encode base64.")
    // })
    

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