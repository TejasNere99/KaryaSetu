// const path=require("path");
// const express = require("express");
// const fs = require("fs");
// const host = express.Router();

// host.use(express.static(path.join(__dirname, "\KaryaSetu\working")));

// // 📌 User Registration → Data save in users.json
// host.post("/user-register", (req, res) => {
//   const newUser = req.body;
//   const fileName = "users.json";

//   fs.readFile(fileName, "utf8", (err, data) => {
//     let users = [];

//     if (!err && data) {
//       try {
//         users = JSON.parse(data);
//       } catch (e) {
//         users = [];
//       }
//     }

//     users.push(newUser);

//     fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         return res.status(500).send("Error saving user data");
//       }

//       console.log("User data saved successfully!");
//       res.send("User Registration Successful ✅");
//     });
//   });
// });

// // 📌 worker Login → Match mobile & password
// host.post("/login", (req, res) => {
//   const { mobile, password } = req.body;

//   fs.readFile("worker.json", "utf8", (err, data) => {
//     if (err) return res.status(500).send("Error reading user file");

//     let users = [];
//     try {
//       users = JSON.parse(data);
//     } catch (e) {
//       users = [];
//     }

//     // Mobile aur password match karo
//     const foundUser = users.find(
//       (u) => u.mobile === mobile && u.password === password
//     );

//     if (foundUser) {
//       console.log("✅ Login Success:", foundUser);
//       res.json({ success: true, message: "Login Successful ✅", user: foundUser });
//     } else {
//       res.json({ success: false, message: "Invalid Mobile or Password ❌" });
//     }
//   });
// });
// // 📌 User Login → Match mobile & password
// host.post("/user-login", (req, res) => {
//   const { mobile, password } = req.body;

//   fs.readFile("users.json", "utf8", (err, data) => {
//     if (err) return res.status(500).send("Error reading user file");

//     let users = [];
//     try {
//       users = JSON.parse(data);
//     } catch (e) {
//       users = [];
//     }

//     // Mobile aur password match karo
//     const foundUser = users.find(
//       (u) => u.mobile === mobile && u.password === password
//     );

//     if (foundUser) {
//       console.log("✅ User Login Success:", foundUser);
//       res.json({ success: true, message: "Login Successful ✅", user: foundUser });
//     } else {
//       res.json({ success: false, message: "Invalid Mobile or Password ❌" });
//     }
//   });
// });
// // 📌 Worker Registration → Data save in worker.json
// host.post("/worker-register", (req, res) => {
//   const newWorker = req.body;
//   console.log("Worker Data:", newWorker);

//   const fileName = path.join(__dirname, "worker.json");

//   fs.readFile(fileName, "utf8", (err, data) => {
//     let workers = [];

//     if (!err && data) {
//       try {
//         workers = JSON.parse(data);
//       } catch (e) {
//         workers = [];
//       }
//     }

//     workers.push(newWorker);

//     fs.writeFile(fileName, JSON.stringify(workers, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         return res.status(500).send("Error saving worker data");
//       }

//       console.log("✅ Worker data saved successfully!");
//       res.send("Worker Registration Successful ✅");
//     });
//   });
// });
// module.exports = {host};