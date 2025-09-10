const mongoose = require("mongoose");



const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})
const adminUser = mongoose.model("admin", adminSchema)

module.exports = adminUser;