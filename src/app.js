const express = require("express");
const {User} = require("./models/user");

const { connectDB } = require("./config/database");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sabrina",
    lastName: "Carpenter",
    email: "sabrina@gmail.com",
    password: "54321",
    age: 24,
    gender: "Female",
    hairColor: "brown"
  };

  const user = new User(userObj);
  await user.save();
  res.send("User data saved.");
});

connectDB()
  .then(() => {
    console.log("database connected successfully.");
    app.listen(3000, () => {
      console.log("The server is running in port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database can not get connected.");
  });
