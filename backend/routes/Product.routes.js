import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/Product.controller.js";


const router = express.Router();


router.route("/").post(createProduct);

router.route("/:id").delete(deleteProduct);

router.route("/").get(getAllProducts);

router.route("/:id").put(updateProduct)

export default router;
