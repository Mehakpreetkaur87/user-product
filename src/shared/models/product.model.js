import {hash} from "bcryptjs";
import {model, Schema} from "mongoose";

const productSchema = new Schema({
    productname :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    productPrice :{
        type: Number,
        required: true,
        minlength: 1,
        maxLength: 7
    }
},{
    timestamps: true
});


const Product = model("Product", productSchema);

export {
    Product
}