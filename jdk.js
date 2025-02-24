import cloudinary from 'cloudinary';
import Product from '../models/product.model.js';
import { Readable } from 'stream';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
        });
        Readable.from(file.buffer).pipe(stream);
    });
};

// Function to delete image from Cloudinary
const deleteImageFromCloudinary = (url) => {
    const publicId = url.split('/').pop().split('.')[0]; // Extract public ID from URL
    return cloudinary.v2.uploader.destroy(publicId, { resource_type: 'auto' });
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single product
export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const files = req.files;

        const urls = await Promise.all(files.map(file => uploadImageToCloudinary(file)));

        const product = new Product({
            name,
            description,
            price,
            files: urls,
        });

        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, existingFiles } = req.body; // existingFiles is an array of URLs to keep

        // Find the existing product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Determine which files to delete
        const filesToDelete = product.files.filter(url => !existingFiles.includes(url));

        // Delete images from Cloudinary that are not in the existingFiles array
        if (filesToDelete.length > 0) {
            await Promise.all(filesToDelete.map(url => deleteImageFromCloudinary(url)));
        }

        // Upload new images
        const files = req.files;
        const newUrls = await Promise.all(files.map(file => uploadImageToCloudinary(file)));

        // Update product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            files: [...existingFiles, ...newUrls], // Keep existing files and add new ones
        }, { new: true });

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete images from Cloudinary
        await Promise.all(product.files.map(url => deleteImageFromCloudinary(url)));

        // Delete product from the database
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

