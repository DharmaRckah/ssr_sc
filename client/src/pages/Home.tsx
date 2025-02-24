// src/pages/Home.tsx

import React from 'react';
import ProductF from '../components/ProductF';
import ProductL from '../components/ProductL';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto ">
            <h1 className="text-2xl font-bold mb-4 text-center">P M</h1>
            <ProductF />
             <ProductL/>
      
        </div>
    );
};

export default Home;