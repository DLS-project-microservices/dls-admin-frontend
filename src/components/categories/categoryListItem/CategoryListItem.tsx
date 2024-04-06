import React, { useState } from "react";
import "./CategoryListItem.css";
import { Category } from "../../../types/categories";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

interface CategoryListItemProps {
    category: Category
    isSelected: boolean,
    onClick: (category: Category) => void;
    handleConfirmDelete: (categoryId: number | undefined) => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
    category,
    isSelected,
    onClick,
    handleConfirmDelete
}) => {
    const [
        confirmDeletePopupIsOpen, 
        setConfirmDeletePopupIsOpen
    ] = useState(false);

    function handleClick() {
        onClick(category);
    }

    function handleDeleteClick() {
        setConfirmDeletePopupIsOpen(true);
    }

    function handleConfirmDeleteClick() {
        handleConfirmDelete(category.id);
        setConfirmDeletePopupIsOpen(false);
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

            <span className="material-symbols-outlined" onClick={handleDeleteClick}>
                delete
            </span>

            <Popup
                contentStyle={{
                    width: "350px"}}
                open={confirmDeletePopupIsOpen}
                onClose={() => setConfirmDeletePopupIsOpen(false)}
                position="right center"
                className="my-popup"
            >
                <div className="popup-container">
                    <div className="pop-text-container">
                        Are you sure you want to delete the category '<strong>{category.name}</strong>'?
                        <br />
                        If not, click outside the box to cancel deletion.
                    </div>
                    <div className="popup-confirm-button-container">
                        <button className="popup-confirm-button" onClick={handleConfirmDeleteClick}>
                            Confirm
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default CategoryListItem;
