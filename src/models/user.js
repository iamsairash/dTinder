const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      minLength: [3, "First name must be at least 3 characters."],
      maxLength: [20, "First name cannot exceed 20 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      minLength: [3, "Last name must be at least 3 characters."],
      maxLength: [20, "Last name cannot exceed 20 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format.");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong password.")
        }
      }
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18."],
      max: [100, "Age cannot exceed 100."],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender.",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL format.");
        }
      },
    },
    about: {
      type: String,
      minLength: [5, "About section must be at least 5 characters."],
      maxLength: [50, "About section cannot exceed 50 characters."],
    },
    skills: {
      type: [String],
      validate: [
        (val) => val.length <= 10,
        "Skills list cannot exceed 10 items.",
      ],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
