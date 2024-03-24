import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../auth/AuthProvider';



const Navbar = () => {
  const [activePage, setActivePage] = useState('');
  const { signOut } = useAuth();
  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };

  return (
    <nav className="admin-navbar">
      <Link to="/" className="logo">Admin</Link>
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
      <button className='nav-btn' onClick={signOut}>
        <span className="nav-btn-text">Sign Out</span>
      </button>
    </nav>
  );
};

export default Navbar;
