const UserQuiz = require("../Models/Quiz")


async function validateQuizAnswer(data) {
    let totalMarks = 0
    const validatedAnswer = []

    const userQuiz = await UserQuiz.findById(data.quizId)

    userQuiz.questions.forEach(item => {
        data.answer.forEach(item1 => {
            if (item.questionText === item1.questionText) {
                validatedAnswer.push({
                    questionId: item1.id,
                    selectedOption: item1.selectAnswerIndex,
                    isCorrect: item.correctOptionIndex == item1.selectAnswerIndex,
                })
                if (item.correctOptionIndex == item1.selectAnswerIndex) {
                    totalMarks += 1
                }
            } else {

            }

        })
    });
    return { validatedAnswer, totalMarks }
}

module.exports = validateQuizAnswer