const path = require("path");
const express = require("express");
const fs = require("fs");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
require('dotenv').config();
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {}; // temporary OTPs


app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON bhi handle karega
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "working")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Render index dynamically
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './working/index.html'));
});

// 📌 User Dashboard Route
app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // Load users
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf-8"));
  } catch (e) { }

  const foundUser = users.find(u => u.id === userId);
  if (!foundUser) return res.status(404).send("User not found");

  // Load workers
  let workers = [];
  try {
    workers = JSON.parse(fs.readFileSync(path.join(__dirname, "worker.json"), "utf-8"));
  } catch (e) { }

  // Load requests
  let allRequests = [];
  try {
    allRequests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8"));
  } catch (e) { }
  const myRequests = allRequests.filter(r => r.userId == userId);

  // load conversations
  let conversations = [];
  try {
    conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));
  } catch (e) { }
  // filter conversations for this user
  const userConversations = conversations.filter(c => c.userId == userId);
  console.log("User Conversations:", userConversations);

  res.render("user-dashboard", { user: foundUser, workers, myRequests, conversations: userConversations });
});

// 📌 Worker Dashboard Route
app.get("/worker/:id", (req, res) => {
  const workerId = parseInt(req.params.id);
  console.log("Worker ID:", workerId);
  // Load users
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf-8"));
  } catch (e) { }

  // Load workers
  let workers = [];
  try {
    workers = JSON.parse(fs.readFileSync(path.join(__dirname, "worker.json"), "utf-8"));
  } catch (e) { }

  const foundWorker = workers.find(w => w.id === workerId);
  if (!foundWorker) return res.status(404).send("User not found");
  console.log("Found Worker:", foundWorker);
  // Load requests
  let allRequests = [];
  try {
    allRequests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8"));
  } catch (e) { }
  const myRequests = allRequests.filter(r => r.workerId == workerId);
  console.log("Worker Requests:", myRequests);

  // load conversations
  let conversations = [];
  try {
    conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));
  } catch (e) { }
  // filter conversations for this worker
  const workerConversations = conversations.filter(c => c.workerId == workerId);
  console.log("Worker Conversations:", workerConversations);
  
  res.render("worker-dashboard", { worker: foundWorker,requests : myRequests, users, conversations: workerConversations  });
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
  const fileName = path.join(__dirname, "users.json");

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
app.get("/submit2", (req, res) => {
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

// 📌 worker Login → Match mobile & password
app.post("/login", (req, res) => {
  const { mobile, password } = req.body;

  fs.readFile(path.join(__dirname, "worker.json"), "utf8", (err, data) => {
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

  fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
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

// -------------------- OTP FEATURE --------------------

// ✅ Send OTP route
app.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ success: false, message: "Mobile number required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  try {
    await client.messages.create({
      body: `Your OTP for KaryaSetu registration is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile
    });
    console.log(`✅ OTP sent to ${mobile}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Twilio Error:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// ✅ Verify OTP route
app.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  if (otpStore[mobile] && otpStore[mobile] == otp) {
    delete otpStore[mobile];
    return res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    return res.json({ success: false, message: "Invalid or expired OTP." });
  }
});




// -------- CHAT FUNCTIONALITY --------

// Send request
app.post("/sendRequest", (req, res) => {
  const { userId, workerId } = req.body;
  const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));

  // avoid duplicate
  let existing = conversations.find(c => c.userId == userId && c.workerId == workerId);
  if (!existing) {
    conversations.push({
      userId: parseInt(userId),
      workerId: parseInt(workerId),
      messages: []
    });
    fs.writeFileSync(path.join(__dirname, "conversations.json"), JSON.stringify(conversations, null, 2));
  }
  res.send("Request Sent Successfully!");
});

// Open chat route
app.get("/chat/:userId/:workerId/:type", (req, res) => {
  const { userId, workerId, type } = req.params;  // type = "user" or "worker"

  const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));
  let convo = conversations.find(c => c.userId == userId && c.workerId == workerId);

  if (!convo) {
    convo = {  // ✅ assign newly created convo to variable too!
      userId: parseInt(userId),
      workerId: parseInt(workerId),
      messages: []
    };
    conversations.push(convo);
   fs.writeFileSync(path.join(__dirname, "conversations.json"), JSON.stringify(conversations, null, 2));
  }
  
  // load user and worker details
  let users = [];
  try { users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")); } catch (e) { }
  let workers = [];
  try { workers = JSON.parse(fs.readFileSync(path.join(__dirname, "worker.json"), "utf-8")); } catch (e) { }
  convo.userDetails = users.find(u => u.id == userId);
  convo.workerDetails = workers.find(w => w.id == workerId);

  let sender = type; // 'user' or 'worker'
  res.render("chat", { convo, sender});
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
    const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));
    const convo = conversations.find(c => c.userId == userId && c.workerId == workerId);
    if (convo) {
      socket.emit("loadMessages", convo.messages);
    }
  });

  // Naya message
  socket.on("chatMessage", ({ userId, workerId, sender, text }) => {
    const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));
    let convo = conversations.find(c => c.userId == userId && c.workerId == workerId);

    if (convo) {
      const msg = { sender, text, time: new Date().toLocaleTimeString() };
      convo.messages.push(msg);

      // Save JSON
      fs.writeFileSync(path.join(__dirname, "conversations.json"), JSON.stringify(conversations, null, 2));

      const room = `${userId}-${workerId}`;
      io.to(room).emit("message", msg); // send to chat room
    }
  });
});

app.post("/sendRequest", (req, res) => {
  const { userId, workerId } = req.body;
  const conversations = JSON.parse(fs.readFileSync(path.join(__dirname, "conversations.json"), "utf-8"));

  let existing = conversations.find(c => c.userId == userId && c.workerId == workerId);
  if (!existing) {
    conversations.push({
      userId: parseInt(userId),
      workerId: parseInt(workerId),
      messages: []
    });
    fs.writeFileSync(path.join(__dirname, "conversations.json"), JSON.stringify(conversations, null, 2));
  }

  // ✅ Redirect back to user dashboard
  res.redirect(`/user/${userId}`);
});

app.post("/submitWorkRequest", (req, res) => {
  const request = req.body;
  const filePath = path.join(__dirname, "requests.json");

  let requests = [];
  if (fs.existsSync(filePath)) {
    try { requests = JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch (e) { requests = []; }
  }

  const newId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
  request.id = newId;
  request.status = "Pending";

  requests.push(request);
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

  res.redirect(`/user/${request.userId}`);
});

// get request for form 
app.get("/send-request/:workerId", (req, res) => {
  let workerId = req.params.workerId;
  res.render("form", { workerId });
});

// get request details for user 
app.get("/requestDetails/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  let type = "user";
  let requests = [];
  try { requests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8")); } catch (e) { }
  const request = requests.find(r => r.id == requestId);
  if (!request) return res.status(404).send("Request not found");

  res.render("requestDetails", { request,type});
});

// get request details for worker
app.get("/requestDetails/worker/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  let type = "worker";
  let requests = [];
  try { requests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8")); } catch (e) { }
  const request = requests.find(r => r.id == requestId);
  if (!request) return res.status(404).send("Request not found");

  res.render("requestDetails", { request,type });
});

// accept request
app.patch("/request/accept/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  let requests = [];
  try { requests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8")); } catch (e) { }
  const requestIndex = requests.findIndex(r => r.id == requestId);
  if (requestIndex === -1) return res.status(404).send("Request not found");
  requests[requestIndex].status = "Accepted";
  fs.writeFileSync(path.join(__dirname, "requests.json"), JSON.stringify(requests, null, 2));
  res.redirect(`/worker/${requests[requestIndex].workerId}`);
});

// reject request
app.patch("/request/reject/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  let requests = [];
  try { requests = JSON.parse(fs.readFileSync(path.join(__dirname, "requests.json"), "utf-8")); } catch (e) { }
  const requestIndex = requests.findIndex(r => r.id == requestId);
  if (requestIndex === -1) return res.status(404).send("Request not found");
  requests[requestIndex].status = "Rejected";
  fs.writeFileSync(path.join(__dirname, "requests.json"), JSON.stringify(requests, null, 2));
  res.redirect(`/worker/${requests[requestIndex].workerId}`);
});

// Patch profile update for user and worker
app.patch("/profileUpdate/:type/:id", (req, res) => {
  const { type, id } = req.params;
  const updatedData = req.body;

  const fileMap = {
    user: "users.json",
    worker: "worker.json"
  };

  const fileName = fileMap[type];
  if (!fileName) return res.status(400).send("Invalid profile type");
  console.log("Looking for:", fileName);
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  } catch (e) {
    return res.status(500).send("Error reading data file");
  }

  const index = data.findIndex(entry => entry.id == id);
  if (index === -1) return res.status(404).send(`${type} not found`);

  data[index] = { ...data[index], ...updatedData };
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

  console.log(`✅ ${type.toUpperCase()} profile updated:`, data[index]);

  // 🟢 Redirect to respective dashboard
  res.redirect(`/${type}/${id}`);
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

