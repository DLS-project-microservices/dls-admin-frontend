import { useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './Categories.css';
import UpdateCategoryForm from '../../components/categories/UpdateCategoryForm';
import { Category } from '../../types/categories';
import { getCategories, updateCategory } from '../../services/categories';

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  async function handleUpdateCategory(categoryToUpdate: Category) {
    console.log(categoryToUpdate);
    try {
      await updateCategory(categoryToUpdate);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setSelectedCategory(categoryToUpdate);
      toastr.success(`Category was updated successfully.`)
    }
    catch (error) {
      toastr.error("Could not update category. Please try again later.")
    }
  }

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
        <div className="category-list-container">
          {categories.map(category => (
            <div 
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            >
            {category.name}
            </div>
          ))}
        </div>
  
        <div className="selected-category-container">
          {selectedCategory ? (
            <UpdateCategoryForm category={selectedCategory} onSubmit={handleUpdateCategory}/>
          ) : (
            <div>Create category form here</div>
          )}
        </div>
      </div>
    );
  }
  
  export default Categories;