import mongoose from "mongoose";

const productScema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

export const Product = mongoose.model('Product',productScema);