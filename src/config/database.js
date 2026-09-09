const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://iamsairash_db_user:FYeRN5kr3MioPY5q@cluster0.kexibdx.mongodb.net/dTinder",
  );
};

module.exports = {
    connectDB
}


