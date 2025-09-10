const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        // uniqueID: { type: String, required: true, unique: true, sparse: true }, // Unique but only when a value exists
        name: { type: String, required: true },
        Email: { 
            type: String, 
            required: true, 
            unique: true, 
            sparse: true, // Ensures email is unique but allows null values
            lowercase: true, // Converts email to lowercase for consistency
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
        },
        AFN: { type: String, required: true },
        solvedQuestions: {
            type: [{ _id: false, questionNumber: String, selectedOption: String }],
            default: []
        },
        score: { type: Number, default: 0 }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Student = mongoose.model("quiz-student", studentSchema);

module.exports = Student;
