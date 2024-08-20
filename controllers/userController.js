import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import sendToken from "../utils/sendToken.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin, country } = req.body;

  if (!name || !email || !password || isAdmin == null || !country) {
    return next(new CustomError(400, "All fields are required"));
  }

  const isUserExist = await User.exists({ email });
  if (isUserExist) {
    return next(new CustomError(403, "User already exists"));
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    isAdmin,
    country,
  });

  sendToken(user, res, "User Created Successfully", 201);
});

const findUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError(400, "Email and password are required"));
  }

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    return next(new CustomError(400, "User does not exist"));
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return next(new CustomError(400, "Password is incorrect"));
  }

  sendToken(user, res, "User Login Successfully", 200);
});

const user = (req, res, next) => {
  res.send("I am User");
};

const admin = (req, res, next) => {
  res.send("I am admin");
};

export { createUser, findUser, user, admin };
