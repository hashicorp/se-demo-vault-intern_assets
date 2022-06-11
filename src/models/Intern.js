import mongoose from "mongoose";

const InternSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    favoriteFood: {type: String, required: true},
})

const Intern = mongoose.model("Intern", InternSchema);
export default Intern;