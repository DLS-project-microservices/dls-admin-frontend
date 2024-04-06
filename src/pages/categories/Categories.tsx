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

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreateCategory(category: Category): Promise<boolean> {
    let categoryWasCreatedSuccessfully = false;

    try {
      const createdCategory = await createCategory(category);
      if (createdCategory) {
        categoryWasCreatedSuccessfully = true;
        toastr.success('Category was created successfully.')
        await fetchCategories(); 
      }  
    }
    catch(error) {
      toastr.error('Could not create category. Please try again later.');
    }
    return categoryWasCreatedSuccessfully;
  }

  async function handleUpdateCategory(categoryToUpdate: Category): Promise<void> {
    console.log(categoryToUpdate);
    try {
      await updateCategory(categoryToUpdate);
      const updatedCategories = await fetchCategories();
      
      setSelectedCategory(updatedCategories.find(category => category.id === categoryToUpdate.id));
      toastr.success(`Category was updated successfully.`)
    }
    catch (error) {
      toastr.error("Could not update category. Please try again later.")
    }
  }

  async function handleDeleteCategory(categoryId: number | undefined): Promise<void> {
    console.log(categoryId);
  }

  function handleGoBack() {
    setSelectedCategory(undefined);
  }

  function handleCategoryClick(category: Category) {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category);
  }

  async function fetchCategories(): Promise<Category[]> {
    let categories: Category[] = [];
    try {
      categories = await getCategories();
      setCategories(categories);
    }
    catch(error) {
      toastr.error('Could not load categories. Please try again later.');
    }
    return categories;
    }

    return (
      <div className="categories-page-container">
        <div className="category-list-container">
          {categories.map(category => (
            <CategoryListItem 
            key={category.name}
            category={category}
            isSelected={selectedCategory === category} 
            onClick={handleCategoryClick}
            handleConfirmDelete={handleDeleteCategory}
            />
          ))}
        </div>
  
        <div className="selected-category-container">
          <div className="go-back-button-container">
            <button 
            className="go-back-button"
            onClick={handleGoBack} 
            style={{ display: selectedCategory ? 'block' : 'none' }} 
            >Go back
            </button>
          </div>
          {selectedCategory ? (
            <>
              <UpdateCategoryForm 
              category={selectedCategory} 
              onSubmit={handleUpdateCategory}
              />
            </>
          ) : (
            <CreateCategoryForm onSubmit={handleCreateCategory} />
          )}
        </div>
      </div>
    );
  }
  
  export default Categories;