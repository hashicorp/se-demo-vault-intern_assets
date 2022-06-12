const express = require("express");
const router = express.Router();

import "dotenv/config";
import Database from "./src/classes/Database.js.js";
const database = new Database(process.env.MONGO_URL);

//All Users Information Route
router.get("/users", (req, res) => {
    res.send("User Information");
});

module.exports = router;