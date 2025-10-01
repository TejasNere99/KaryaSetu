const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

// File paths
const userFile = path.join(__dirname, "user.json");
const workerFile = path.join(__dirname, "worker.json");
const convoFile = path.join(__dirname, "conversations.json");

// Homepage (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// User login
app.post("/userLogin", (req, res) => {
  const { mobile, password } = req.body;
  const users = JSON.parse(fs.readFileSync(userFile, "utf-8"));
  const workers = JSON.parse(fs.readFileSync(workerFile, "utf-8"));

  const user = users.find(u => u.mobile === mobile && u.password === password);
  if (user) {
    res.render("dashboard", { type: "user", user, workers });
  } else {
    res.send("Invalid User Login");
  }
});

// Worker login
app.post("/workerLogin", (req, res) => {
  const { mobile, password } = req.body;
  const workers = JSON.parse(fs.readFileSync(workerFile, "utf-8"));

  const worker = workers.find(w => w.mobile === mobile && w.password === password);
  if (worker) {
    const conversations = JSON.parse(fs.readFileSync(convoFile, "utf-8"));
    const requests = conversations.filter(c => c.workerId === worker.id);

    res.render("dashboard", { type: "worker", worker, requests });
  } else {
    res.send("Invalid Worker Login");
  }
});

// Send request
app.post("/sendRequest", (req, res) => {
  const { userId, workerId } = req.body;
  const conversations = JSON.parse(fs.readFileSync(convoFile, "utf-8"));

  // avoid duplicate
  let existing = conversations.find(c => c.userId == userId && c.workerId == workerId);
  if (!existing) {
    conversations.push({
      userId: parseInt(userId),
      workerId: parseInt(workerId),
      messages: []
    });
    fs.writeFileSync(convoFile, JSON.stringify(conversations, null, 2));
  }
  res.send("Request Sent Successfully!");
});

// Open chat
app.get("/chat/:userId/:workerId/:type", (req, res) => {
  const { userId, workerId, type } = req.params;  // type = "user" or "worker"

  const conversations = JSON.parse(fs.readFileSync(convoFile, "utf-8"));
  let convo = conversations.find(c => c.userId == userId && c.workerId == workerId);
  if (!convo) return res.send("No conversation found");

  // type decide kare sender
  let sender = type;  // frontend me use hoga
  res.render("chat", { convo, sender });
});


// -------- SOCKET.IO CHAT --------
io.on("connection", socket => {
  console.log("✅ New socket connected");

  // Room join
  socket.on("joinRoom", ({ userId, workerId }) => {
    const room = `${userId}-${workerId}`;
    socket.join(room);
    console.log(`Joined room: ${room}`);

    // Pehle ke messages bhej do
    const conversations = JSON.parse(fs.readFileSync(convoFile, "utf-8"));
    const convo = conversations.find(c => c.userId == userId && c.workerId == workerId);
    if (convo) {
      socket.emit("loadMessages", convo.messages);
    }
  });

  // Naya message
  socket.on("chatMessage", ({ userId, workerId, sender, text }) => {
    const conversations = JSON.parse(fs.readFileSync(convoFile, "utf-8"));
    let convo = conversations.find(c => c.userId == userId && c.workerId == workerId);

    if (convo) {
      const msg = { sender, text, time: new Date().toLocaleTimeString() };
      convo.messages.push(msg);

      // Save JSON
      fs.writeFileSync(convoFile, JSON.stringify(conversations, null, 2));

      const room = `${userId}-${workerId}`;
      io.to(room).emit("message", msg); // send to chat room
    }
  });
});



server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
