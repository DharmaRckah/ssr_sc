import cloudinary from "cloudinary"
import Product from "../models/productModel.js"
import { configDotenv } from "dotenv";
import {Readable} from "stream"
configDotenv();
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


// funcion for upload 

// function for delete 
const deleteImageFromCloudinary = (url) =>{
    const publicId = url.split('/').pop().split('.')[0];

    return cloudinary.v2.uploader.destroy(publicId,{
        resource_type:'auto' 
    })
}



// product create controller
 
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
        });
        Readable.from(file.buffer).pipe(stream);
    });
};

// Product create controller
export const createProductController = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const files = req.files; // This should match the field name in your frontend

        // Check if files were uploaded
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded." });
        }

        const urls = await Promise.all(files.map(file => uploadImageToCloudinary(file)));

        const product = new Product({
            name,
            description,
            price,
            files: urls,
        });

        await product.save();

        return res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};
// get all product controller 

export const getAllProductController = async(req , res)=>{
    try {
        const products = await Product.find();
       return res.status(200).json({success:true,data:products});
      
    } catch (error) {
        console.log(error)
     return    res.status(500).send({success:false,message:error.message})
        
    }
}


// get singel product controller 
export const getSingleProductController = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:'Product not found'})
        }
       return res.status(200).json({success:true,data:product});
    } catch (error) {
        console.log(error)
       return res.status(500).json({success:false,message:error.message})
       
        
    }
}

