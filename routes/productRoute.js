import express from "express"
import { createProductController, getAllProductController, getSingleProductController } from "../controllers/productController.js";
import upload from "../middlewares/multerMiddleware.js";
const productRoute  = express.Router();

productRoute.get("/",getAllProductController)

productRoute.post('/create', upload.array('files', 10), createProductController); 


productRoute.get('/:id', getSingleProductController);


export default productRoute;

