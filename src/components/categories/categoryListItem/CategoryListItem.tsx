import React from "react";
import "./CategoryListItem.css";
import { Category } from "../../../types/categories";

interface CategoryListItemProps {
    category: Category
    isSelected: boolean,
    onClick: (category: Category) => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
    category,
    isSelected,
    onClick
}) => {

    function handleClick() {
        onClick(category)
    }

    return (
        <div className={`category-list-item-container ${isSelected ? 'selected-category-list-item': ''}`}
            key={category.id}
            onClick={handleClick}
            >
            <div>
                {category.name}
            </div>
            <div>
                {category.categoryDescription}
            </div>
            <span className="material-symbols-outlined" onClick={() => alert('i got clicked')}>
                delete
            </span>
        </div>
    )
}

export default CategoryListItem;