const express = require("express");
const {userAuth} = require("../middlewares/auth")

const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
  console.log("connection requrest");
  res.send("connection request sent.");
});

module.exports = requestRouter;
