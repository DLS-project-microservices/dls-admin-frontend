import { Category } from "../types/categories";

async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.REACT_APP_INVENTORY_ADMIN_URL}/category`);
    const categories = await response.json(); 
    return categories;
}
    
export {
    getCategories
}