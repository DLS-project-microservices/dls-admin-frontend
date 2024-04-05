import React from "react";
import { useState, useEffect } from 'react';
import { Category } from "../../../types/categories";

interface UpdateCategoryFormProps {
    category: Category
    onSubmit: (category: Category) => void;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({ category, onSubmit }) => {

    const [name, setName] = useState<string>(category.name);
    const [categoryDescription, setCategoryDescription] = useState<string | undefined>(category.categoryDescription);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    onSubmit({ ...category, name, categoryDescription })

}

useEffect(() => {
    setName(category.name);
    setCategoryDescription(category.categoryDescription);
    setIsFormValid(false);
}, [category])

useEffect(() => {
    setIsFormValid(
        name !== category.name ||
        categoryDescription !== category.categoryDescription
        );
}, [name, categoryDescription, category])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <div className="form-section">
                <label>Name:</label>
                <input className="input-field"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                    />
            </div>
            <div className="form-section">
                    <label>Description:</label>
                    <textarea className="input-field" rows={5} cols={50}
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                </div>

            <button className="add-product-btn" type="submit" disabled={!isFormValid}>Update category</button>
            </form>
        </div>
        )
}

export default UpdateCategoryForm;