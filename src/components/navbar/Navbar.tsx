import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  onSignOut: () => void;
}

const Navbar = ({ onSignOut }: NavbarProps) => {
  const [activePage, setActivePage] = useState('');

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };

  return (
    <nav className="admin-navbar">
      <div className="logo">Admin</div>
      <ul className="nav-links">
        <li>
          <Link
            to="/products"
            className={activePage === 'products' ? 'active' : ''}
            onClick={() => handleSetActivePage('products')}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            className={activePage === 'categories' ? 'active' : ''}
            onClick={() => handleSetActivePage('categories')}
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className={activePage === 'orders' ? 'active' : ''}
            onClick={() => handleSetActivePage('orders')}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className={activePage === 'users' ? 'active' : ''}
            onClick={() => handleSetActivePage('users')}
          >
            Users
          </Link>
        </li>
      </ul>
      <button className='nav-btn' onClick={onSignOut}>
        <span className="nav-btn-text">Sign Out</span>
      </button>
    </nav>
  );
};

export default Navbar;
