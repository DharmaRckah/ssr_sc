// src/components/ProductForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/product';

const ProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('description', description);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            await axios.post(`${BASE_URL}/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Reset form or handle success
            setName('');
            setPrice(0);
            setDescription('');
            setFiles([]);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2 border p-2"
                required
            /> 
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mb-2 border p-2"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 border p-2"
                required
            />
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Create Product</button>
        </form>
    );
};

export default ProductForm;