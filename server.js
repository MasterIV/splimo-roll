const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

console.log('Server started...');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on("connection", socket => {
  console.log('  Client has connected.');

  socket.on("join", ({name, room}) => {
    console.log(`  ${name} has joined room '${room}'.`);
    socket.join(room);

    socket.on("roll", (roll) => {
      console.log(`  >> ${name} has rolled the dice'.`);
      io.to(room).emit("roll", {name, roll, type: 'roll'});
    });

    socket.on("reroll", (roll) => {
      console.log(`  >> ${name} has re-rolled some dice'.`);
      io.to(room).emit("roll", {name, roll, type: 'reroll'});
    });
  });
});

server.listen(3080, () => {
  console.log('listening on *:3080');
});
