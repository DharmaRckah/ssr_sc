// src/types/productTypes.ts

export interface Product {
    _id?: string; // Optional because it may not exist when creating a new product
    name: string;
    description: string;
    price: number;
    files: string[]; // Assuming files are URLs or file paths
  }
  
  export interface CreateProductData {      
    name: string;
    description: string;
    price: number;
    files: string[];
  }