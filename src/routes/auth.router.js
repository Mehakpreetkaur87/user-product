import { Router } from "express";
// import { postCredGetMeChain, userPostValidationChains, validate } from "../../middleware.js";
import {
    validate, validateValidationChains,
    userPutValidationChain, userPostValidationChains,
    postCredGetMeChain
} from "../validationChains/user.validation.js"
import { responseProcessor } from "../shared/responseProcessor.js";

import { signupController, loginController } from "../contollers/auth.controller.js";
const router = Router();

router.post('/signup', validate(userPostValidationChains), responseProcessor(signupController));
console.log("Auth routes loaded");

// login

router.post(
  "/login", validate(postCredGetMeChain),  responseProcessor(loginController)
);

export {
    router as authRoutes
}

// const authRoutes = Router();

// // login
// authRoutes.post("/login", validate(postCredGetMeChain), responseProcessor(loginController));
// //signup
// authRoutes.post("/signup", validate(userPostValidationChains), responseProcessor(signupController));

// export {
//     authRoutes
// }