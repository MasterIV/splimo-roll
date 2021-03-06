const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

console.log('Server started...');

app.use(express.static(path.join(__dirname, 'build')));

app.get(/\w*/, function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on("connection", socket => {
  console.log('  Client has connected.');

  socket.on("join", ({name, room}) => {
    console.log(`  ${name} has joined room '${room}'.`);

    socket.rooms.forEach(r => socket.leave(r));
    socket.join(room);

    socket.removeAllListeners("roll");
    socket.on("roll", (roll) => {
      console.log(`  >> ${name} has rolled the dice'.`);
      io.to(room).emit("roll", {...roll, name});
    });
  });
});

server.listen(3080, () => {
  console.log('listening on *:3080');
});
