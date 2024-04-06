import { json } from "stream/consumers";
import { Category } from "../types/categories";

async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category`);
    const categories = await response.json(); 
    return categories;
}

async function createCategory(category: Category) {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
    const data = await response.json();
    return data;
}

async function updateCategory(category: Category): Promise<Category> {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });

    const updatedCategory = await response.json();
    return updatedCategory;
}

async function deleteCategory(categoryId: number | undefined): Promise<boolean> {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category/${categoryId}`, {
        method: "DELETE",
    });
    return response.ok ? true : false;
}
    
export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}