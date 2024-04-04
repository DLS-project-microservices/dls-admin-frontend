import { json } from "stream/consumers";
import { Category } from "../types/categories";

async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category`);
    const categories = await response.json(); 
    return categories;
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
    
export {
    getCategories,
    updateCategory
}