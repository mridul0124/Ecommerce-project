import { Product } from "../models/products.model.js";
import mongoose from "mongoose";

export const createProduct = async(req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(404).json({
            message : "Please Provide All Details.",
            success : false
        })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({
            data : newProduct,
            message : "Product Added Successfully.",
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error.",
            success : false
        })
        
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            message : "Invaid Product Id",
            success : false
        })
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(201).json({
            message : "Product Deleted",
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Product Not Found",
            success : false
        })
    }
}

export const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        
            return res.status(201).json({
              data : products,
              message : "Products Fetched",
              success : true
            })
    
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error.",
            success : false
          })
        
    }
}

export const updateProduct = async (req,res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            message : "Invaid Product Id",
            success : false
        })
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});

      return res.status(201).json({
        data : updatedProduct,
        message : "Product Updated",
        success : true
      })

    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            message : "Error in Updating Product",
            success : false
          })
        
    }
}