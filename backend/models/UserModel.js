const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      validate: {
        validator: (field) => field.length >= 2,
        message: "First name must be at least 2 characters length",
      },
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      validate: {
        validator: (field) => field.length >= 2,
        message: "Last name must be at least 2 characters length",
      },
    },
    email: { type: String, required: [true, "Email is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (field) => field.length >= 4,
        message: "Password must be at least 4 characters length",
      },
    },
    gender: { type: String, required: [true, "Gender is required"] },
    birthDate: { type: Date, required: [true, "Birth date is required"] },
    image: { type: String, required: [true, "Profile image is required"] },
    active: { type: Number, default: 1 },
    user: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
