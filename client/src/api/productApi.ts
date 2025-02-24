// src/api/productApi.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/product';

export const createProduct = async (productData: { name: string; price: number; description: string; files: File[] }) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description);
    for (let i = 0; i < productData.files.length; i++) {
        formData.append('files', productData.files[i]);
    }
    return await axios.post(`${BASE_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getProducts = async () => {
    console.log("this is server component for runnning in server ")
    const response = await axios.get(BASE_URL);
    return response.data;
};