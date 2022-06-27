const mongoose = require("mongoose");
const User = require("../models/User.js");
const signale = require("signale");

module.exports = class Database {
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
     * 
     * @param {String} username 
     * @param {String} password 
     * @returns {String} Intern created successfully/failed message
     */
    async createUser(username, password) {
        try {
            const user = await User.findOne({username: username});

            if(user != null) {
                return "User already exists"
            } else {
                signale.start("Creating User...");

                await User.create({
                    username: username,
                    password: password,
               });

               signale.success("User Created Successfully!");
               return "User Created Successfully";
            }
        } catch (err) {
            throw new Error("Couldn't Create Intern - ", err);
        }
    }

    /**
     * 
     * @param {String} username 
     */
    async findUser(username) {
        try {
            const user = await User.findOne({username: username});

            if(user != null) {
                return user;
            } else {
                return null;
            }
        }
        catch (err) {
            throw new Error("Couldn't Find User - ", err);
        }
    }

    // /**
    //  * Creates Intern in MongoDB 
    //  * @param {String} firstName 
    //  * @param {String} lastName 
    //  * @param {String} email 
    //  * @param {String} favoriteFood 
    //  * @returns {String} Intern created successfully/failed message
    //  */
    // // async createIntern(firstName, lastName, email, favoriteFood) {
    //     try {
    //         const intern = await Intern.findOne({email: email});

    //         if(intern) {
    //             return "Intern already exists";
    //         } else {
    //             signale.start("Creating User...");

    //             await Intern.create({
    //             firstName: firstName,
    //             lastName: lastName,
    //             email: email,
    //             favoriteFood: favoriteFood
    //             });

    //             signale.success("Intern Created Successfully!");
    //             return "Intern Created Successfully!";
    //         }
            
    //     } catch(err) {
    //         throw new Error("Couldn't Create Intern.", err);
    //         // return "Couldn't Create Intern. Check Server log for more details.";
    //     }
    // }

    // /**
    //  * Deletes Intern from MongoDB
    //  * @param {String} email
    //  * @returns {String} Intern deleted successfully/failed message
    // */
    // async deleteIntern(email) {
    //     const removeFlag = await Intern.deleteOne({email: email});
        
    //     // If removeFlag is equal to 0, intern is deleted
    //     if(!removeFlag.deletedCount) {
    //         return signale.error("Couldn't Find Intern.");
    //     }

    //     return signale.success("Successfully Deleted Intern.")
    // }

    // /**
    //  * 
    //  * @param {String} email 
    //  * @returns intern object
    //  */
    // async findIntern(email) {
    //     const intern = await Intern.findOne({email: email});
    //     if(!intern) {
    //         throw new Error("Couldn't Find Intern.");
    //     }

    //     return intern;
    // }

    // /**
    //  * Get all interns from MongoDB
    //  */
    // async getAllInterns() {
    //     try {
    //         const interns = await Intern.find();
    //         return interns;
    //     } catch(err) {
    //         signale.error("Couldn't Find Interns.", err);
    //     }
        
    // }
}