const mongoose = require("mongoose")

const InternSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

const User = mongoose.model("User", InternSchema);
module.exports = User;