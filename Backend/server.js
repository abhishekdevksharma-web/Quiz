
const express = require("express")
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require('cookie-parser');
const Url = require("url")

const http = require("http");
const path = require("path");
const { Server } = require("socket.io")
const mongoose = require("mongoose");


const socketHandler = require("./conection");
const User = require("./models/user");
const adminUser = require("./models/admin");
const { updateScore, createquizQuestion, findQuizById } = require("./models/controllers");
const CreateStudent = require("./models/addandupdate")
const { setUser, getUser } = require("./usesession")
const Quiz = require("./models/quiz")


const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 3000;


const cors = require('cors');
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/svg", express.static(path.join(__dirname, "../svg")));
const upload = multer();

app.use(upload.none());

socketHandler(io)
mongoose.connect('mongodb://127.0.0.1:27017/Student-data')
    .then(() => {
        console.log("mongoDB connected");
    })
    .catch((err) => {
        console.log("error", err);
    })





const checkAuthMiddle = (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.userData) {
            return res.redirect("/login")
        }
        const { userUUID, userName } = req.cookies.userData

        if (!userUUID) return res.redirect("/login")
        next()
    }
    catch (error) {
        return res.redirect("/login");
    }
};









app.get("/admin", checkAuthMiddle, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/Admin.html"));
});
app.get("/", (req, res) => {
    const geturl = Url.parse(req.url, true)
    const sessionID = geturl.query.quizID;
    if (sessionID) {
        res.cookie("QuizID", sessionID)
        return res.sendFile(path.join(__dirname, "../frontend/Student.html"));
    }
    return res.sendFile(path.join(__dirname, "../frontend/Student.html"));
});

app.get("/login", (req, res) => {
    return res.sendFile(path.join(__dirname, "../frontend/form.html"));
});
app.get("/signup", (req, res) => {
    return res.sendFile(path.join(__dirname, "../frontend/signup.html"));
});
app.get("/get-cookies", (req, res) => {
    const a = req.cookies
    res.json({ QuizID: a })
});

app.post("/get-quiz", async (req, res) => {
    const { quizId } = req.body
    if (quizId === "null") {
        return res.status(400).json({ error: "Quiz ID is required." });
    } else {
        const findQuiz = await Quiz.findOne({ quizID: quizId });
        res.json({ data: findQuiz })
    }
})

app.get("/favicon.ico", (req, res) => {
});



app.post("/authenticate", async (req, res) => {
    try {
        const { Name, AFN, Email, userID } = req.body;
        if (!Name || !AFN || !Email) {
            return res.status(400).json({ error: "Not come data from frontend" });
        }

        const getuser = await User.findOne({ Email, AFN });
        if (!getuser) {
            return res.status(401).json({ error: "Invalid Email and Password" });
        }
        const StudentName = getuser.Name;
        userUUID = uuidv4();
        res.cookie("userData", userUUID, { expires: new Date(Date.now() + 86400000) })
        res.status(200).json({
            name: StudentName,
            afn: AFN,
            email: Email,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/registerStudent", async (req, res) => {
    const QuizIDbycookies = req.cookies.QuizID
    const reqvalue = req.body
    CreateStudent({ Name: reqvalue.name, AFN: reqvalue.afn, Email: reqvalue.email, QuizIDbycookies })
})

app.post("/adminSign", async (req, res) => {
    const { AFN } = req.body
    const getuser = await User.findOne({ AFN: AFN })
    if (!getuser) {
        return res.redirect("login")
    }
    const userName = getuser.Name
    userUUID = uuidv4();
    setUser(userUUID, getuser)
    res.cookie("userId", getuser._id, { expires: new Date(Date.now() + 86400000) })
    res.cookie("userData", { userUUID, userName }, { expires: new Date(Date.now() + 86400000) })
    return res.redirect("/admin")

})
app.post("/signup", async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body
    if (!fullName || !email || !password) return console.log("re");

    const getuser = await adminUser.create({
        fullName: fullName,
        email: email,
        password: password,
    })
    if (getuser) return res.redirect("/admin")
})

app.post('/create-quiz', async (req, res) => {
    try {

        const user = req.cookies.userData.userUUID
        const userid = getUser(user)
        const { questions, IDs, adminData } = req.body;

        const created = await createquizQuestion({ questions, IDs, adminData, userid: userid._id })
        if (!created) {
            console.log("Not created");
        }
        res.json({ url: `http://localhost:${PORT}/?quizID=${created.quizID}` });

    }
    catch (err) {
        console.log(err);
    }

})
app.post("/findQuizByUser", async (req, res) => {
    const userId = req.cookies["userId"]
    const result = await findQuizById(userId)
    res.json({ data: result })
})
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/admin`);
    console.log(`http://localhost:${PORT}/login`);
})
