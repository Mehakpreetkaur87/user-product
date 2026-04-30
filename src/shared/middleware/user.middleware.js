import { AuthorizationError } from "../error.js";
// only admin allowed
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new AuthorizationError("Admin only access");
  }
  next();
};

export { isAdmin };