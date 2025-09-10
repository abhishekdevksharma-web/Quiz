const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    quizID: { type: String, required: true, unique: true },
    quizName: {
        type: String,
    },
    quizSubject: {
        type: String,
    },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true }
        }
    ],
    Students: [{ type: mongoose.Schema.Types.ObjectId, ref: "quiz-student" }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    },
    submission: {
        type: String,
        default: "Not Yet"
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    isLive: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
