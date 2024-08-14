// const { server } = require("../server");
// const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user Connected", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User is disconnected", socket.id);
//   });
// });

// module.exports = io;
