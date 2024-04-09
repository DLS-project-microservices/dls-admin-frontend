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
    function handleDeleteCloseClick() {
        setConfirmDeletePopupIsOpen(false);
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
                <div>
                    {category.name}
                </div>
                <div className="category-list-item-description">
                    {category.categoryDescription}
                </div>
            </div>

            <div className="delete-button-container">

            <span className="material-symbols-outlined delete-icon" onClick={handleDeleteClick}>
                delete
            </span>
            </div>

            <Popup
                contentStyle={{
                    width: "350px"}}
                open={confirmDeletePopupIsOpen}
                onClose={handleDeleteCloseClick}
                position="right center"
            >
                <div className="popup-container">
                    <div className="popup-text-container">
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
