const express = require("express");
const cors = require("cors");
const http = require("http");
const { setServers } = require("dns");
const app = express();
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://react-chat-app-frontend-eight.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`Connecting to ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`Joined user ID ${socket.id} Join room :${data}`);
})
    socket.on("send_Msg", (data) => {
        socket.to(data.room).emit("recived_Msg",data)
})
  socket.on("disconnect", () => {
    console.log("disconnect user", socket.id);
  });
});

server.listen(3001, () => {
  console.log("app listening on port 3001");
});
