import { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './AddProducts.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/category');
          const data = await response.json();
          const categoryNames = data.map((category: any) => category.name);
          setCategories(categoryNames);
        }
        catch(error) {
          console.log(error);
          toastr.error("Could not load categories. Please try again later.");
        }
      }
      getCategories();

    }, []);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
          return;
        }

        const newProduct = {
            name,
            description,
            quantity,
            categories: selectedCategories,
        };

        try {
          const response = await fetch('http://localhost:8080/api/products', {
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
            toastr.success("Category was created successfully.");
          }
        }
        catch(error) {
          console.log(error);
        }
    };

    useEffect(() => {
      setIsFormValid(
        selectedCategories.length > 0 && name !== '');
    }, [selectedCategories, name])

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
                      isObject={false}
                      options={categories}
                      selectedValues={selectedCategories}
                      onSelect={(selectedList) => setSelectedCategories(selectedList)}
                      onRemove={(selectedList) => setSelectedCategories(selectedList)}
                      showCheckbox={true}
                      placeholder='Add category...'
                      hidePlaceholder={true}
                  />
                  <button className="add-product-btn" type="submit" disabled={!isFormValid}>Create new product</button>
                </div>
              </form>
            </div>
        </div>
    );
};

export default AddProduct;