const Quiz = require("./quiz")
// const createquestion = require("./question")
const Student = require("./studentSchema")
async function updateScore(data) {
    try {
        console.log(data);

        const OBJdata = data.data;
        const keysArray = Object.keys(OBJdata);
        const valueArray = Object.values(OBJdata);
        let n = keysArray.length
        for (let i = 0; i < n; i++) {
            // console.log("question="+,"option="+valueArray[i]);     
            const questionNumber = keysArray[i];
            const selectedOption = valueArray[i];
            const quizID = data.QuizID
            const { name, afn } = JSON.parse(data.localdata);
            const quiz = await Quiz.findOne({ quizID }).populate("Students")
            if (!quiz) {
                console.log("quiz is not found");

            }
            const updatedStudent = await Student.findOneAndUpdate(
                { AFN: afn, "solvedQuestions.questionNumber": questionNumber },
                { $set: { "solvedQuestions.$.selectedOption": selectedOption } },
                { new: true }
            );

            if (!updatedStudent) {

                await Student.findOneAndUpdate(
                    { AFN: afn },
                    { $push: { solvedQuestions: { questionNumber, selectedOption } } },
                    { new: true }
                );
            }
        }
    } catch (err) {
        console.log(err);

    }
}

async function createquizQuestion({ questions, IDs, adminData, userid }) {
    const findQuiz = await Quiz.findOne({ quizID: IDs.generateRoomIdbyfun });
    console.log(questions.quizName);

    if (!findQuiz) {
        const result = await Quiz.create({
            quizID: IDs.generateRoomIdbyfun,
            quizName: adminData.quizName,
            quizSubject: adminData.quizSubject,
            questions: questions,
            Students: [],
            createdBy: userid,
        })
        return result
    }
}

//find quiz

async function findQuizById(data) {
    const result = await Quiz.find({ createdBy: data })
    let quizdata = [];
    result.forEach((doc) => {
        console.log(doc);

        const d = doc.Date
        quizdata.push({ quizName: doc.quizName, quizSubject: doc.quizSubject, submission: doc.submission, Date: d.toLocaleDateString("en-IN"), quizID:doc.quizID })
    });
    return quizdata
}
module.exports = { updateScore, createquizQuestion, findQuizById }