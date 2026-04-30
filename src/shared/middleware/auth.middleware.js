import { User } from "../models/user.model.js"
import { AuthorizationError } from "../error.js"
import { cookie } from "express-validator";
import jwt from "jsonwebtoken";

const JWT_SECRET=process.env.JWT_SECRET;

// check if user is logged in
const checkAuth = (req, res, next) => {
  try {
    let token;

    // get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) throw new AuthorizationError("Please login");

    const decoded = jwt.verify(token, JWT_SECRET);
     console.log("decoded value =>",decoded)
    // attach user info to request

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export { checkAuth };



