import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categorias_id: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://127.0.0.1:8000/api/productos/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/productos/${id}/`)
            .then(response => {
                fetchProducts();
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setFormData({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            categorias_id: product.categorias_id
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/productos/${editProduct.id}/`, formData)
            .then(response => {
                fetchProducts();
                setEditProduct(null);
                setFormData({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    categorias_id: ''
                });
            })
            .catch(error => {
                console.error('There was an error updating the product!', error);
            });
    };

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
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editProduct && (
                <form onSubmit={handleUpdate}>
                    <h2>Edit Product</h2>
                    <label htmlFor="nombre">Name:</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    <label htmlFor="descripcion">Description:</label>
                    <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                    <label htmlFor="precio">Price:</label>
                    <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} step="0.01" required />
                    <label htmlFor="categorias_id">Category ID:</label>
                    <input type="number" id="categorias_id" name="categorias_id" value={formData.categorias_id} onChange={handleChange} required />
                    <button type="submit">Update Product</button>
                </form>
            )}
        </div>
    );
};

export default ProductList;
