import mongoose, { mongo } from "mongoose";
import Intern from "../models/Intern";
import signale from "signale";
import axios from "axios";

export default class Database {
    constructor(mongoURL) {
        mongoose.
            connect(mongoURL, {
                useNewURLParser: true,
        useUnifiedTopology: true,
      })
            })
    }
}