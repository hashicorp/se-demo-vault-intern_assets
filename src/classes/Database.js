import mongoose, { mongo } from "mongoose";
import Intern from "../models/Intern";
import signale from "signale";

export default class Database {
    constructor(mongoURL) {
        mongoose.connect(mongoURL, {
            useNewURLParser: true,
        })
        .then(() => {
            signale.success("Database Connected!");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Creates Intern in MongoDB 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} favoriteFood 
     * @returns {String} User created successfully/failed message
     */
    async createIntern(firstName, lastName, email, favoriteFood) {
        try {
            const intern = await Intern.findOne({email: email});
            signale.start("Creating User...");

            await Intern.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                favoriteFood: favoriteFood
            })

            return signale.success("User Created Successfully!");
        } catch(err) {
            return signale.error("Couldn't Create User", err);
        }
    }
}