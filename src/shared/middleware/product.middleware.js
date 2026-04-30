import { BadRequestError } from "../error.js";
import { isValidObjectId } from "mongoose";

export const validProduct = (req, res, next) =>{
    const {id} = req.params;

    if (!validProduct(id)) return next(new BadRequestError("Invalid product id"));

    next();
}