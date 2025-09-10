const Quiz = require("./quiz");
const Student = require("./studentSchema");

async function CreateStudent({ Name, AFN, Email, userID ,QuizIDbycookies}) {
    try {
        console.log({ Name, AFN, Email, userID ,QuizIDbycookies});
        const quizID = QuizIDbycookies;

        console.log(quizID);
        // 🔍 Check if student already exists in quiz
        const findUser = await Quiz.findOne({
            quizID: quizID,
            Students: { $elemMatch: { Email: Email, AFN: AFN } }
        });
        console.log(typeof(findUser));
        
        if (!findUser) {  // ❗ Agar student nahi mila to create karo
            const CTstudent = await Student.create({ uniqueID: userID, name: Name, Email: Email, AFN: AFN });
            console.log(CTstudent);
            
            if (!CTstudent) {
                console.log("not created student");
            }
            else console.log("created student");
            

            const update = await Quiz.updateOne(
                { quizID: quizID },
                { $addToSet: { Students: CTstudent._id } } // `$addToSet` duplicate avoid karega
            );
            if (update.matchedCount === 0) {
                console.log("not added id");
            }else console.log("added student");
            

        } else {
            console.log("Student already exists in quiz.");
        }

    } catch (err) {
        console.error("Error:", err);
    }
}


module.exports = CreateStudent