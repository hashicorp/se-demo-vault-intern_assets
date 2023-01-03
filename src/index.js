/**
 * Copyright (c) HashiCorp, Inc.
 */

const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});
const port = process.env.PORT;
const apiRouter = require("./routes/api.js");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));

app.use("/api", apiRouter);

if(port == 3000){
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/html/home.html"));
    });

    app.get("/success", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/html/success.html"))
    })
} else if (port == 3001) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/html/noEncryptHome.html"));
    });

    app.get("/success", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/html/noEncryptSuccess.html"))
    })
}

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/error.html"))
})

app.listen(port, () => {
    console.log(`Intern Hub listening at http://localhost:${port}`)
});