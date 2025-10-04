const path=require("path");
const express = require("express");
const fs = require("fs");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON bhi handle karega
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "working")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Render index dynamically
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'./working/index.html'));
});

// 📌 Debug route to check all users
app.get("/debug/users", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading users file", details: err.message });
    }
    
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: "Error parsing users JSON", details: e.message });
    }
    
    res.json({ users: users, count: users.length });
  });
});

// 📌 User Dashboard Route
app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);   // string → number
  console.log("🔍 Looking for user with ID:", userId, "Type:", typeof userId);
  
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.log("❌ Error reading users file:", err);
      return res.status(500).send("Error reading users file");
    }

    let users = [];
    try {
      users = JSON.parse(data);
      console.log("📋 All users:", users);
    } catch (e) {
      console.log("❌ Error parsing users JSON:", e);
      users = [];
    }

    // Number compare
    const foundUser = users.find(u => u.id === userId);
    console.log("🔍 Found user:", foundUser);

    if (foundUser) {
      console.log("✅ User Found:", foundUser);
      // Load workers for chat
      fs.readFile("worker.json", "utf8", (err, workerData) => {
        let workers = [];
        if (!err && workerData) {
          try {
            workers = JSON.parse(workerData);
          } catch (e) {}
        }
        res.render("user-dashboard", { user: foundUser, workers }); // EJS render karega
      });
    } else {
      console.log("❌ User not found for ID:", userId);
      res.status(404).send("User not found");
    }
  });
});


// 📌 Worker Registration → Data save in worker.json with auto ID
app.post("/worker-register", (req, res) => {
  const newWorker = req.body;
  const fileName = path.join(__dirname, "worker.json");

  fs.readFile(fileName, "utf8", (err, data) => {
    let workers = [];

    if (!err && data) {
      try {
        workers = JSON.parse(data);
      } catch (e) {
        workers = [];
      }
    }

    // ✅ Auto increment ID
    let newId = workers.length > 0 ? workers[workers.length - 1].id + 1 : 1;
    newWorker.id = newId;

    workers.push(newWorker);

    fs.writeFile(fileName, JSON.stringify(workers, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error saving worker data");
      }

      console.log("✅ Worker data saved successfully with ID:", newId);
      res.send(`Worker Registration Successful ✅ (ID: ${newId})`);
    });
  });
});


// 📌 User Registration → Data save in users.json with auto ID
app.post("/user-register", (req, res) => {
  const newUser = req.body;
  const fileName = "users.json";

  fs.readFile(fileName, "utf8", (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (e) {
        users = [];
      }
    }

    // ✅ Auto increment ID
    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    newUser.id = newId;

    users.push(newUser);

    fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error saving user data");
      }

      console.log("✅ User data saved successfully with ID:", newId);
      res.send(`User Registration Successful ✅ (ID: ${newId})`);
    });
  });
});

// submit 2
app.get("/submit2", (req, res) =>{
  console.log("req.body");

});
// Category wise workers show karne ka route

app.get("/category/:name", (req, res) => {
  const category = req.params.name; // url se category milegi (plumber/electrician)
  const fileName = path.join(__dirname, "worker.json");
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");

    let workers = [];
    try {
      workers = JSON.parse(data);
    } catch (e) {
      workers = [];
    }

    // Filter workers by category
    let filtered = workers.filter(w =>
      w.category && w.category.toLowerCase() === category.toLowerCase()
    );

    res.render("category", { category, workers: filtered });
  });
});


// 📌 Worker Dashboard Route
app.get("/worker/:id", (req, res) => {
  const workerId = parseInt(req.params.id);
  console.log("🔍 Looking for worker with ID:", workerId, "Type:", typeof workerId);

  fs.readFile("worker.json", "utf8", (err, data) => {
    if (err) {
      console.log("❌ Error reading worker file:", err);
      return res.status(500).send("Error reading worker file");
    }

    let workers = [];
    try {
      workers = JSON.parse(data);
    } catch (e) {
      console.log("❌ Error parsing worker JSON:", e);
      workers = [];
    }

    const foundWorker = workers.find(w => w.id === workerId);
    console.log("🔍 Found worker:", foundWorker);

    if (foundWorker) {
      // Load conversations for this worker
      fs.readFile("conversations.json", "utf8", (err, convoData) => {
        let conversations = [];
        if (!err && convoData) {
          try {
            conversations = JSON.parse(convoData);
          } catch (e) {}
        }
        const requests = conversations.filter(c => c.workerId === workerId);
        res.render("worker-dashboard", { worker: foundWorker, requests });
      });
    } else {
      res.status(404).send("Worker not found");
    }
  });
});

// 📌 worker Login → Match mobile & password
app.post("/login", (req, res) => {
  const { mobile, password } = req.body;

  fs.readFile("worker.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading user file");

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (e) {
      users = [];
    }

    // Mobile aur password match karo
    const foundUser = users.find(
      (u) => u.mobile === mobile && u.password === password
    );

    if (foundUser) {
      console.log("✅ Login Success:", foundUser);
      res.json({ success: true, message: "Login Successful ✅", user: foundUser });
    } else {
      res.json({ success: false, message: "Invalid Mobile or Password ❌" });
    }
  });
});

// 📌 User Login → Match mobile & password
app.post("/user-login", (req, res) => {
  const { mobile, password } = req.body;

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading user file");

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (e) {
      users = [];
    }

    // Mobile aur password match karo
    const foundUser = users.find(
      (u) => u.mobile === mobile && u.password === password
    );

    if (foundUser) {
      console.log("✅ User Login Success:", foundUser);
      res.json({ success: true, message: "Login Successful ✅", user: foundUser });
    } else {
      res.json({ success: false, message: "Invalid Mobile or Password ❌" });
    }
  });
});

// -------- CHAT FUNCTIONALITY --------

// Send request
app.post("/sendRequest", (req, res) => {
  const { userId, workerId } = req.body;
  const conversations = JSON.parse(fs.readFileSync("conversations.json", "utf-8"));

  // avoid duplicate
  let existing = conversations.find(c => c.userId == userId && c.workerId == workerId);
  if (!existing) {
    conversations.push({
      userId: parseInt(userId),
      workerId: parseInt(workerId),
      messages: []
    });
    fs.writeFileSync("conversations.json", JSON.stringify(conversations, null, 2));
  }
  res.send("Request Sent Successfully!");
});

// Open chat
app.get("/chat/:userId/:workerId/:type", (req, res) => {
  const { userId, workerId, type } = req.params;  // type = "user" or "worker"

  const conversations = JSON.parse(fs.readFileSync("conversations.json", "utf-8"));
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
    const conversations = JSON.parse(fs.readFileSync("conversations.json", "utf-8"));
    const convo = conversations.find(c => c.userId == userId && c.workerId == workerId);
    if (convo) {
      socket.emit("loadMessages", convo.messages);
    }
  });

  // Naya message
  socket.on("chatMessage", ({ userId, workerId, sender, text }) => {
    const conversations = JSON.parse(fs.readFileSync("conversations.json", "utf-8"));
    let convo = conversations.find(c => c.userId == userId && c.workerId == workerId);

    if (convo) {
      const msg = { sender, text, time: new Date().toLocaleTimeString() };
      convo.messages.push(msg);

      // Save JSON
      fs.writeFileSync("conversations.json", JSON.stringify(conversations, null, 2));

      const room = `${userId}-${workerId}`;
      io.to(room).emit("message", msg); // send to chat room
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});