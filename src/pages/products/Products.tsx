import React from 'react'
import { Link } from 'react-router-dom';
const Products = () => {
  
    return (
      <div>
        Products
        <Link to="/products/add-product">
        <button>
          <span>
            Add New Product
          </span>
        </button>
        </Link>
      </div>
    );
  }
  
  export default Products;