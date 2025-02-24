// src/components/ProductList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/product';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("Fetching products from server...");
            try {
                const response = await axios.get(BASE_URL);
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id} className="border-b py-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="text-gray-500">${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;