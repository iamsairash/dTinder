const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

app.use("/nodemon", (req, res) => {
  res.send("testing nodemon");
});

app.use("/", (req, res) => {
  res.send("Welcome to .......");
});

app.listen(3000, () => {
  console.log("The server is running in port 3000...");
});
