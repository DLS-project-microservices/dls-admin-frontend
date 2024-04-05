import { useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './Categories.css';
import CreateCategoryForm from '../../components/categories/createCategoryForm/CreateCategoryForm';
import UpdateCategoryForm from '../../components/categories/updateCategoryForm/UpdateCategoryForm';
import CategoryListItem from '../../components/categories/categoryListItem/CategoryListItem';
import { Category } from '../../types/categories';
import { getCategories, createCategory, updateCategory } from '../../services/categories';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  async function handleCreateCategory(category: Category) {
    let categoryWasCreatedSuccessfully = false;

    try {
      const createdCategory = await createCategory(category);
      if (createdCategory) {
        categoryWasCreatedSuccessfully = true;
        toastr.success('Category was created successfully.')  
      }  
    }
    catch(error) {
      toastr.error('Could not create category. Please try again later.');
    }
    return categoryWasCreatedSuccessfully;
  }

  async function handleUpdateCategory(categoryToUpdate: Category) {
    console.log(categoryToUpdate);
    try {
      await updateCategory(categoryToUpdate);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      
      setSelectedCategory(updatedCategories.find(category => category.id === categoryToUpdate.id));
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
            <CategoryListItem 
            key={category.name}
            category={category}
            isSelected={selectedCategory === category} 
            onClick={setSelectedCategory}
            />
          ))}
        </div>
  
        <div className="selected-category-container">
          {selectedCategory ? (
            <UpdateCategoryForm category={selectedCategory} onSubmit={handleUpdateCategory}/>
          ) : (
            <CreateCategoryForm onSubmit={handleCreateCategory} />
          )}
        </div>
      </div>
    );
  }
  
  export default Categories;