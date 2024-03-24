import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Products from './pages/products/Products';
import Orders from './pages/orders/Orders';
import Users from './pages/users/Users';
import Categories from './pages/categories/Categories';
import { useState } from 'react';
import SignIn from './pages/signIn/SignIn';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div className='App'>
          <div className='gradient__bg'>
            <Navbar onSignOut={handleSignOut} />
          </div>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
