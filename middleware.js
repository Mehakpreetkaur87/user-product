// middleware.js

import { validationResult, matchedData } from "express-validator";
import { BadRequestError } from "./src/shared/utils/error.js";
import { isValidObjectId } from "mongoose";

// 🔹 validate middleware (runs validation chains)
const validate = (chains) => {
  return async (req, res, next) => {
    // run all validation chains
    await Promise.all(chains.map((chain) => chain.run(req)));

    const errors = validationResult(req);

    // if validation fails → throw error
    if (!errors.isEmpty()) {
      throw new BadRequestError(JSON.stringify(errors.array()));
    }

    // only keep validated data
    req.data = matchedData(req);

    next();
  };
};

//  check valid Mongo ID
const resolveUserById = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid Mongo ID");
  }

  req.userId = id;
  next();
};

export { validate, resolveUserById };

// import { body, checkSchema, matchedData, validationResult } from "express-validator";
// import { USERS } from "./src/shared/data.js";
// import { isValidObjectId } from "mongoose";
// import { BadRequestError } from "./src/shared/error.js";



// const loggingMiddleware = (req, res, next) =>{
//     console.log(`Request Method: ${req.method}, Request URL : ${req.url}`);
//     next();
// }


// const postUserMiddleware = (req, res, next) =>{
//     const {body} = req;
//     if(!body.username || !body.displayName)
//         return res.status(400).send({message: "Must enter username and displayName !!"});
//     // username ---> string[5,30], displayName ---> string[5,30]
//     next();
// }

// const resolveUserById = (req, res, next) => {
//     const { body, params : { id }} = req;
//     req.userId = id;
//     if(!isValidObjectId(id)) return next(new BadRequestError("Not valid mongo ID !!"));
//     next();
// }

// const myMiddleware1=(req, res, next)=>{
//     console.log(`myMiddleware1 is executed`);
//     next();
// }
// const myMiddleware2=(req, res, next)=>{
//     console.log(`myMiddleware2 is executed`);
//     next();
// }
// const myMiddleware3=(req, res, next)=>{
//     console.log(`myMiddleware3 is executed`);
//     next();
// }
// const myMiddleware4=(req, res, next)=>{
//     console.log(`myMiddleware4 is executed`);
//     next();
// }



// export {
//     loggingMiddleware, 
//     postUserMiddleware, 
//     resolveUserById,
//     myMiddleware1,
//     myMiddleware2,
//     myMiddleware3,
//     myMiddleware4,
//     validate,
//     paginationMiddleware,
//     userPostValidationChains,
//     postCredGetMeChain,
//     userPutValidationChain
// }