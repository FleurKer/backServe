require("dotenv").config();
require("./models/connection");
const Message = require('./models/Message');
const Chatroom = require('./models/Chatroom');

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var chatroomRouter = require("./routes/chatroom");

var supplierRouter = require("./routes/suppliers");
var usersRouter = require("./routes/users");
var servicesRouter = require("./routes/services");

var app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://172.20.10.3:3000",
	},
});


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chatroom", require("./routes/chatroom"));
app.use("/supplier", require("./routes/suppliers"));
app.use("/city", require("./routes/city"));
app.use("/service", require("./routes/services"));

app.use("/messages", require("./routes/messages"));

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createRoom", (name) => {
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		// socket.emit("foundRoom", result[0].messages);
	});
socket.on("newMessage", (data) => {
		const { room_id, message, timestamp, chatroom, user, supplier } = data;
		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = new Message ({
			message: message,
			time: `${timestamp.hour}:${timestamp.mins}`,
			date: `${timestamp.date}/${timestamp.month}/${timestamp.year}`,
			chatroom: chatroom ,
			user: user ,
			supplier: supplier ,
		});
		newMessage.save().then(newDoc => {
			console.log("Le message a bien été envoyé!");
		});

		socket.to(message).emit(
			"roomMessage", newMessage);

		socket.emit("roomsList", chatRooms);
		
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.exports = app;
