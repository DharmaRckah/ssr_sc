// src/server/productService.ts

import axios from 'axios';
import { Product, CreateProductData } from '../types/productTypes';

const API_URL = 'http://localhost:5000/api/v1/product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ data: Product[] }>(API_URL); // Adjust based on your API response structure
    // console.log('Fetched products:', response.data.data); 
    return response.data.data; // Return the nested data if your API response is { data: [...] }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

export const createProduct = async (productData: CreateProductData): Promise<Product> => {
  try {
    const response = await axios.post<{ data: Product }>(`${API_URL}/create`, productData); // Adjust based on your API response structure
    console.log('Created product:', response.data.data); // Log the created product for debugging
    return response.data.data; // Return the nested data if your API response is { data: { ... } }
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product. Please try again later.');
  }
};
