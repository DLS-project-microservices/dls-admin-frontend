import { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
import 'toastr/build/toastr.css';
import { Category } from '../../types/categories';
import { getCategories } from '../../services/categories';
import './AddProducts.css';

const AddProduct = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);   
        }
        catch (error) {
          toastr.error('Could not load categories. Please try again later.')
        }
        
        }
        fetchCategories();
      }, []);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
          return;
        }

        const newProduct = {
            name,
            description,
            price,
            quantity,
            categories: selectedCategories.map((category) => category.id),
        };
        


      
        try {
          const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
          });
          
          if (response.status === 200) {
            setName('');
            setDescription('');
            setQuantity(0);
            setSelectedCategories([]);
            setPrice(0);
            toastr.success("Product was created successfully.");
            navigate('/products');
            
          }
        }
        catch(error) {
          console.log(error);
        }
    };

    useEffect(() => {
      setIsFormValid(
        selectedCategories.length > 0 && name !== '' && price > 0);
    }, [selectedCategories, name, price])

    return (
        <div className="page-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                  <h1>Create new product</h1>
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
                          let priceValue = parseInt(e.target.value);
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
                  <div className="form-btn-container">
                    <button className="add-item-btn" type="submit" disabled={!isFormValid}>Create new product</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
    );
};

export default AddProduct;