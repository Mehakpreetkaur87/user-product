import { body } from "express-validator";

export const productValidationChain = [
    body("productname").isLength({min: 2}),
    body('productPrice').isNumeric(),
]