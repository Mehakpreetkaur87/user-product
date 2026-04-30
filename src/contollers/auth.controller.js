import { User } from "../shared/models/user.model.js";

import { compare } from "bcryptjs";

import jwt from "jsonwebtoken";
import { SuccessResponse } from "../shared/responseProcessor.js";
import { BadRequestError } from "../shared/error.js";

const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP
const signupController = async (req, res) => {
  const { username, password, displayName } = req.body;

  // create user
  const user = await User.create({ username, password, displayName });

  // generate token (AUTO LOGIN)
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "3h",
  });

  // send cookie
  res.cookie("token", token, {
    httpOnly: true,
  });

  return new SuccessResponse({ user, token }, "Signup successful");
};

// LOGIN
const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) 
    throw new BadRequestError("Invalid credential");

  const isMatch = await compare(password, user.password);

  if (!isMatch) throw new BadRequestError("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "3h",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });

  return new SuccessResponse({ token }, "Login successful");
};

export { signupController, loginController};