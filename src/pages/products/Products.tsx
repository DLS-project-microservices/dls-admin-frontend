import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../types/products';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (productToDelete !== null) {
      try {
        await axios.delete(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/products/${productToDelete}`);
        setProducts(products.filter(product => product.id !== productToDelete));
        setShowDeletePopup(false);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <Link to="/products/add-product">
        <button className="action-btn">
          <span className="action-btn-text">Add New Product</span>
        </button>
      </Link>
      <div className="product-headers">
        <span>Name</span>
        <span>Quantity</span>
        <span>Price</span>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <span>{product.name}</span>
              <span>{product.quantity}</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="product-actions">
              <button className="icon-btn" onClick={() => navigate(`/products/edit-product/${product.id}`)}>
                <div className="edit-icon">
                  <FaEdit />
                </div>
              </button>
              <button className="icon-btn" onClick={() => { setProductToDelete(product.id); setShowDeletePopup(true); }}>
                <div className="delete-icon">
                  <FaTrash />
                </div>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-content">
            <p>Are you sure you want to delete this product?</p>
            <div className="button-row">
              <button className="action-btn" onClick={handleDelete}>Yes</button>
              <button className="action-btn cancel" onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;