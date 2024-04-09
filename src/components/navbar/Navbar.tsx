import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activePage, setActivePage] = useState('');
  const navigate = useNavigate();
  const signOut = useSignOut()  
  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };


  const onClickedsignOut = async () => {
    signOut()
    navigate('/signin');  
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
      <button className='nav-btn' onClick={onClickedsignOut}>
        <span className="nav-btn-text">Sign Out</span>
      </button>
    </nav>
  );
};

export default Navbar;
