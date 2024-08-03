import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/productos/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.nombre}</h3>
                        <p>{product.descripcion}</p>
                        <p>Price: ${product.precio}</p>
                        <p>Category ID: {product.categorias_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
