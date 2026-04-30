import { ExpressValidator } from "express-validator";
import { Product } from "../shared/models/product.model.js";

import { SuccessResponse } from "../shared/responseProcessor.js";

// get all products

const getProducts = async () =>{
    const products = await Product.find();
    return new SuccessResponse(products);
};

// create

const createProduct = async(req) =>{
    const product = await Product.create(req.body);
    return new SuccessResponse(product, "Product created");
};


// delete

const deleteProduct = async(req) =>{
    await Product.findByIdAndDelete(req.params.id);
    return new SuccessResponse({}, "Product deleted");

}

export {
    getProducts, 
    createProduct,
    deleteProduct
}