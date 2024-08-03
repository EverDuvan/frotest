import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categorias_id: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/productos/', formData)
            .then(response => {
                console.log('Product added successfully!', response);
                setFormData({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    categorias_id: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <label htmlFor="nombre">Name:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <label htmlFor="descripcion">Description:</label>
            <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            <label htmlFor="precio">Price:</label>
            <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} step="0.01" required />
            <label htmlFor="categorias_id">Category ID:</label>
            <input type="number" id="categorias_id" name="categorias_id" value={formData.categorias_id} onChange={handleChange} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
