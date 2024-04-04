import { useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './Categories.css';
import { Category } from '../../types/categories';
import { getCategories } from '../../services/categories';

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      }
      catch(error) {
        toastr.error('Could not load categories. Please try again later.');
      }
      }
      fetchCategories();
    }, []);
  
    return (
      <div className="categories-page-container">
        <div className="category-list">
          {categories.map(category => (
            <div key={category.id}>{category.name}</div>
          ))}
        </div>
  
        <div>
          test
        </div>
      </div>
    );
  }
  
  export default Categories;