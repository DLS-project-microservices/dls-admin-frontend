import React, { useState } from "react";
import "./CategoryListItem.css";
import { Category } from "../../../types/categories";

interface CategoryListItemProps {
    category: Category
    isSelected: boolean,
    onClick: Function
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
    category,
    isSelected,
    onClick
}) => {

    const [ localSelected, setLocalSelected ] = useState<boolean>(isSelected)

    function handleClick() {
        onClick(category)
        setLocalSelected(!localSelected);
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
        </div>
    )
}

export default CategoryListItem;