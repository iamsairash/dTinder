const express = require("express");
const { User } = require("./models/user");
const { connectDB } = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json()); // middleware, it will convert all the json data that we
// send from client or postman to js object

app.post("/signup", async (req, res) => {
  const saltRounds = 10;
  try {
    //validate data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    //encrypt password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User data saved.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials.");
    }
    res.send("login success.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/users", async (req, res) => {
  const emailId = req.body.email;
  try {
    if (!emailId) {
      throw new Error("Email is required to get user data.");
    }
    const users = await User.find({ email: emailId });
    if (users.length === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      res.status(404).send("No Users found.");
    } else {
      res.send(allUsers);
    }
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new Error("User id is required.");
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).send("User not found.");
    } else {
      res.send("User deleted successfully.");
    }
  } catch (err) {
    res.status(400).send("Invalid Email Id or deletion operation failed.");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  console.log(data);
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "age",
      "about",
      "skills",
      "password",
      "gender",
    ];

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) {
      throw new Error("Request body cannot be empty.");
    }
    const isAllowedUpdates = fieldsToUpdate.every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isAllowedUpdates) {
      throw new Error("can't update the value.");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      returnDocument: "after",
    });
    if (!updatedUser) {
      res.status(404).send("User not found.");
    } else {
      res.send("User data updated successfully!");
    }
  } catch (err) {
    res.status(400).send("UPDATE FAILED. " + err.message);
  }
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