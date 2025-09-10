const mongoose = require("mongoose")


const question = new mongoose.Schema({
    createquestion: [{
        question: String,
        options: [
            { text: String, isCorrect: Boolean }
        ]
    }],
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
})

const allquestion = mongoose.model("question", question)

module.exports = allquestion