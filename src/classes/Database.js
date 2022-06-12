import mongoose from "mongoose";
import Intern from "../models/Intern.js";
import signale from "signale";

export default class Database {
    constructor(mongoURL) {
        mongoose.connect(mongoURL, {
            useNewURLParser: true,
            useUnifiedTopology: true,
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
     * @returns {String} Intern created successfully/failed message
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

            return signale.success("Intern Created Successfully!");
        } catch(err) {
            return signale.error("Couldn't Create Intern.", err);
        }
    }

    /**
     * Deletes Intern from MongoDB
     * @param {String} email
     * @returns {String} Intern deleted successfully/failed message
    */
    async deleteIntern(email) {
        const removeFlag = await Intern.deleteOne({email: email});
        
        // If removeFlag is equal to 0, intern is deleted
        if(!removeFlag.deletedCount) {
            return signale.error("Couldn't Find Intern.");
        }

        return signale.success("Successfully Deleted Intern.")
    }

    /**
     * 
     * @param {String} email 
     * @returns intern object
     */
    async findIntern(email) {
        const intern = await Intern.findOne({email: email});
        if(!intern) {
            return signale.error("Couldn't Find Intern.");
        }

        return intern;
    }

    /**
     * Get all interns from MongoDB
     */
    async getAllInterns() {
        try {
            const interns = await Intern.find();
            return interns;
        } catch(err) {
            signale.error("Couldn't Find Interns.", err);
        }
        
    }
}