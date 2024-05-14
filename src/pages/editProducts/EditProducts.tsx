import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { Product } from '../../types/products';
import { Category } from '../../types/categories';
import { getCategories } from '../../services/categories';

const EditProduct = () => {
   const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/products/${id}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setQuantity(product.quantity);
        setPrice(product.price);
        setSelectedCategories(product.categories);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);   
        }
        catch (error) {
          toastr.error('Could not load categories. Please try again later.')
        }
        
        }

    fetchProduct();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    setIsFormValid(
      selectedCategories.length > 0 && name !== '' && price > 0
    );
  }, [selectedCategories, name, price]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      return;
    }

    const updatedProduct = {
      name,
      description,
      price,
      quantity,
      categories: selectedCategories.map(category => category.id),
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/products/${id}`, updatedProduct);
      if (response.status === 200) {
        navigate('/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Edit Product</h1>
          </div>
          <div className="form-section">
            <label>Name:</label>
            <input className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-section">
            <label>Description:</label>
            <textarea className="input-field" rows={5} cols={50}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>Price:</label>
            <input className="input-field"
              type="number"
              value={price}
              onChange={(e) => {
                let priceValue = parseFloat(e.target.value);
                if (priceValue < 0) {
                  priceValue = 0;
                }
                setPrice(priceValue);
              }}
            />
          </div>
          <div className="form-section">
            <label>Quantity:</label>
            <input className="input-field"
              type="number"
              value={quantity}
              onChange={(e) => {
                let quantityValue = parseInt(e.target.value);
                if (quantityValue < 0) {
                  quantityValue = 0;
                }
                setQuantity(quantityValue);
              }}
            />
          </div>
          <div className="form-section">
          <Multiselect
                      options={categories}
                      selectedValues={selectedCategories}
                      onSelect={(selectedList) => setSelectedCategories(selectedList)}
                      onRemove={(selectedList) => setSelectedCategories(selectedList)}
                      showCheckbox={true}
                      placeholder='Add category...'
                      displayValue='name'
                      hidePlaceholder={true}
                  />
          </div>
          <div className="form-btn-container">
            <button className="add-item-btn" type="submit" disabled={!isFormValid}>Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;