const imageChecker = require("../libs/imageChecker");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const SALT = 10;

const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      birthDate,
      image,
    } = req.body;
    const checkUser = await UserModel.findOne({ email });
    const isValidImage = imageChecker(image);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passLength = password.length >= 4;
    if (!checkUser) {
      if (passLength) {
        if (password.trim() === confirmPassword.trim()) {
          if (emailRegex.test(email)) {
            if (isValidImage) {
              bcrypt.hash(password, SALT, async (error, hashPassword) => {
                if (error) {
                  throw new Error(error.message);
                } else {
                  let newUser = new UserModel({
                    ...req.body,
                    password: hashPassword,
                  });
                  let storeUser = await newUser.save();
                  console.log("registrovan");
                  res.send("Successufull registration!");
                }
              });
            } else {
              res.send(
                "Valid image types are jpg,jpeg and png. Image must be under 1MB"
              );
            }
          } else {
            res.send("Not valid email");
          }
        } else {
          res.send("Passwords must match");
        }
      } else {
        res.send("Password must be at least 4 characters lenght");
      }
    } else {
      res.send("User with this email exists.");
    }
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          if (result) {
            res.send("User logged");
          } else {
            res.send("Credentials not valid!");
          }
        }
      });
    } else {
      res.send("User with this email doesn't exist");
    }
  } catch (error) {
    console.error(err);
  }
};

module.exports = {
  register,
  login,
};
