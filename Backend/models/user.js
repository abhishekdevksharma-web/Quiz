const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    AFN: {
        type: Number,
        unique: true,
    },
    Email: {
        type: String,
        required: true
    }
});


const User = mongoose.model("Student", userSchema)

module.exports = User;