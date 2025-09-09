const path=require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
// const { user } = require("./routes/user");
// const { host } = require("./routes/host");
// app.use(user);
// app.use(host);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON bhi handle karega
app.use(express.static(path.join(__dirname, "frontend/public/css")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "backend/views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/public/html/index.html"));
});
// 📌 Worker Registration → Data save in worker.json
app.post("/worker-register", (req, res) => {
  const newWorker = req.body;
  console.log("Worker Data:", newWorker);

  const fileName = path.join(__dirname, "backend/models/worker.json");

  fs.readFile(fileName, "utf8", (err, data) => {
    let workers = [];

    if (!err && data) {
      try {
        workers = JSON.parse(data);
      } catch (e) {
        workers = [];
      }
    }

    workers.push(newWorker);

    fs.writeFile(fileName, JSON.stringify(workers, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error saving worker data");
      }

      console.log("✅ Worker data saved successfully!");
      res.send("Worker Registration Successful ✅");
    });
  });
});

// 📌 User Registration → Data save in users.json
app.post("/user-register", (req, res) => {
  const newUser = req.body;
  const fileName = path.join(__dirname, "backend/models/users.json");

  fs.readFile(fileName, "utf8", (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (e) {
        users = [];
      }
    }

    users.push(newUser);

    fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error saving user data");
      }

      console.log("User data saved successfully!");
      res.send("User Registration Successful ✅");
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
  fs.readFile(path.join(__dirname, "backend/models/worker.json"), "utf8", (err, data) => {
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

  fs.readFile(path.join(__dirname, "backend/models/worker.json"), "utf8", (err, data) => {
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

  fs.readFile(path.join(__dirname, "backend/models/users.json"), "utf8", (err, data) => {
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
