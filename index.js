const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors('*'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://hieudt7.github.io/youtube-video-sharing","http://13.210.156.147:3000","http://13.213.71.82:3000","http://34.75.110.218:3000/"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data)
    console.log(data.room)
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});
