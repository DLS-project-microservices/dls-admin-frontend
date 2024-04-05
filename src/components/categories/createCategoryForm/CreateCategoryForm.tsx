import React from "react";
import { useState, useEffect } from 'react';
import { Category } from "../../../types/categories";

interface CreateCategoryFormProps {
    onSubmit: (category: Category) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onSubmit }) => {

    const [name, setName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const testCat = {
        name: "test",
        categoryDescription: "test",
    }
    onSubmit(testCat)

}

useEffect(() => {
    setIsFormValid(name !== '');
}, [name])

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

            <button className="add-product-btn" type="submit" disabled={!isFormValid}>Create category</button>
            </form>
        </div>
        )
}

export default CreateCategoryForm;