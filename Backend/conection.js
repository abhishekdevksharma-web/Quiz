const Quiz = require("./models/quiz");
const Student = require("./models/studentSchema");
const updateScore = require("./models/controllers");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("new user connected");

        const userId = socket.handshake.query.userId;
        const RoomID = socket.handshake.query.RoomID;
        // console.log("new user connected", RoomID, userId);

        // to view log 
        socket.on("Jion_Admin_Room", (RoomID) => {
            const Adminroom = RoomID
            socket.join(Adminroom)
            io.to("Adminroom").emit("IP", IP)
            console.log(`${socket.id} joined the ${Adminroom}`);
        })



        socket.on('disconnect', () => {
            console.log('User disconnected');

        });
        socket.on('handleAnswer', (e) => {
            updateScore(e)
        });

    })
}