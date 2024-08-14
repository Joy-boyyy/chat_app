const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ErrorMiddle = require("./Error/errorMiddle");
require("dotenv").config();
const registerRouter = require("./routes/registerRoute.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { initialize } = require("./endPoints/conversationBtw.js");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow credentials to be sent
};

app.use(cors(corsOptions));

// ---------user routes (Register and Signin)
app.use("/user", registerRouter);

// ------------error Middleware
app.use(ErrorMiddle);

// -----------------Socket.io connection code

const getMySocketId = (myId) => {
  return userSocketMap[myId];
};

const userSocketMap = {};

initialize(io, getMySocketId);

io.on("connection", (socket) => {
  console.log("user Connected", socket.id);
  const adminId = socket.handshake.query.userId;

  if (adminId !== undefined) {
    userSocketMap[adminId] = socket.id;
    socket.emit("onlineUsers", Object.keys(userSocketMap));
    console.log("online users-----", userSocketMap);
  }

  // console.log("userSocketMap-----", userSocketMap);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[adminId];
    console.log("userSocketMap-----", userSocketMap);

    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const portNum = process.env.PORT || 8000;

server.listen(portNum, () => {
  console.log(`Server is running on port ${portNum}`);
});
