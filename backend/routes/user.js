// const path=require("path");
// const express = require("express");
// const fs = require("fs");
// const user = express.Router();
// user.use(express.static(path.join(__dirname, "../../frontend/public")));

// user.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname,'../../frontend/public/html/index.html'));
// });

// user.get("/category/:name", (req, res) => {
//   const category = req.params.name; // url se category milegi (plumber/electrician)
//   fs.readFile(path.join(__dirname, "../models/worker.json"), "utf8", (err, data) => {
//     if (err) return res.status(500).send("Error reading file");

//     let workers = [];
//     try {
//       workers = JSON.parse(data);
//     } catch (e) {
//       workers = [];
//     }

//     // Filter workers by category
//     let filtered = workers.filter(w => 
//       w.category && w.category.toLowerCase() === category.toLowerCase()
//     );

//     res.render("category", { category, workers: filtered });
//   });
// });
// // submit 2
// user.get("/submit2", (req, res) =>{
//   console.log("req.body");
// });
// module.exports = {user};
