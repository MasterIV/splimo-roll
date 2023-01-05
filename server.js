const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const fs = require('fs');
var crypto = require('crypto');

console.log('Server started...');

try {
  fs.statSync('chars');
} catch(e) {
  fs.mkdirSync('chars');
}

function validate_name(name) {
  if(!name.match(/^\w+-\w+$/g))
    throw "Invalid Character Name!";
}

function hash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
}

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())

app.get('/char/:name', (req, res) => {
  const {name} = req.params;
  validate_name(name);

  try {
    const c = JSON.parse(fs.readFileSync(`chars/${name}.json`));
    delete c.password;
    delete c.salt;
    res.send(c);
  } catch(err) {
    res.status(404).send('Character not found.');
  }
});

app.post('/char/:name', (req, res) => {
  const c = req.body;
  const {name} = req.params;
  validate_name(name);

  try {
    const old = JSON.parse(fs.readFileSync(`chars/${name}.json`));
    if(old.password !== hash(c.password, old.salt)) {
      res.status(403).send('Invalid Password!');
      return;
    }
  } catch(e) {
    console.log(`Creating new character: ${name}`);
  }

  c.salt = crypto.randomBytes(16).toString('hex');
  c.password = hash(c.password, c.salt);

  fs.writeFileSync(`chars/${name}.json`, JSON.stringify(c, null, "  "));
  res.send("Character saved!")
});

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
