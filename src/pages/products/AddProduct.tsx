import { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await fetch('/test-data/categories/categories.json')
          const data = await response.json();
          const categoryNames = data.data.map((category: any) => category.name);
          setCategories(categoryNames);
        }
        catch(error) {
          console.log(error);
        }
      }
      getCategories();

    }, []);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            quantity,
            categories: selectedCategories,
        };

        setName('');
        setDescription('');
        setQuantity(0);
        setSelectedCategories([]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
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
                <button type="submit">Create new product</button>
            </form>
        </div>
    );
};

export default AddProduct;