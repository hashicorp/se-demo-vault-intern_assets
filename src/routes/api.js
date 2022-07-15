const express = require("express");
const store = require("store2");
const router = express.Router();

const path = require("path");

if(process.env.NODE_ENV === "production") {
    require("dotenv").config({
        path: "/etc/profile.d/instruqt-env.sh"
    });
} else {
    require("dotenv").config({
        path: path.join(__dirname, "../../.env")
    });    
}




const Vault = require("../classes/Vault");
const vault = new Vault();
const Database = require("../classes/Database.js");
const signale = require("signale");

// signale.info("ENV VARIABLES: ", process.env.MONGO_URL);

// const database = new Database("mongodb://localhost:27017/instruqt");
const database = new Database(process.env.MONGO_URL);


router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const encryptedString = await vault.encryptText(password);
        try {
            if(await database.findUser(username) === null) {
                database.createUser(username, encryptedString);
                res.redirect("/success");
            }
            else {
                signale.error("User already exists");
                store("Error", "Username already exists");
                res.redirect("/error");
            }
        } catch (err) {
            throw new Error("Couldn't Create Intern - ", err);
        }
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

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await database.findUser(username);

        if(user) {
            const decryptedString = await vault.decryptText(user.password);
            const base64DecodedString = Buffer.from(decryptedString, "base64").toString("ascii");
            if(base64DecodedString === password) {
                res.redirect("/success");
            } else {
                res.redirect("/error")
            }
        } else {
            res.redirect("/error")
        }
    } catch (err) {
        store("Error", `${err}`);
        res.redirect("/api/error")
    }
});

router.get("/getUsers", async (req, res) => {
    return res.json(await database.getUsers());
});

//Error Route
router.get("/error", (req, res) => {
    res.send({
        error: store("Error"),
    });
    store(false);
});

module.exports = router;