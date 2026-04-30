import { body, validationResult, matchedData } from "express-validator";

// signup validatiton


export const postCredGetMeChain = [
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]

export const userPostValidationChains = [
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
    body("password")
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
    ,
    body("role")
    .notEmpty()
    .withMessage("Role cannont be empty")
]

export const userPutValidationChain =[
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty !")
        .isString()
        .withMessage("username must be a string !")
        .isLength({min: 3, max: 30})
        .withMessage("username sould be between [3, 30] !"),
    body("displayName")
        .notEmpty()
        .withMessage("displayName cannot be empty!")
        .isString()
        .withMessage("displayName must be a string !")
        .isLength({ min: 3, max: 30 })
        .withMessage("displayName must be between [3, 30] !"),
]

export const validateValidationChains = (req, res, next)=>{
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(400).send({ error: result.array() });
    req.data = matchedData(req);
    next();
}

export const validate = (validationChains)=>{
    return [...validationChains, validateValidationChains]
}

export const postUserMiddleware = (req, res, next) =>{
    const {body} = req;
    if(!body.username || !body.displayName)
        return res.status(400).send({message: "Must enter username and displayName !!"});
    // username ---> string[5,30], displayName ---> string[5,30]
    next();
}

export const resolveUserById = (req, res, next) => {
    const { body, params : { id }} = req;
    req.userId = id;
    if(!isValidObjectId(id)) return next(new BadRequestError("Not valid mongo ID !!"));
    next();
}