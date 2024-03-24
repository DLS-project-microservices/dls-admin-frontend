import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/products/Products';
import Orders from './pages/orders/Orders';
import Users from './pages/users/Users';
import Categories from './pages/categories/Categories';
import SignIn from './pages/signIn/SignIn';
import { useAuth } from './auth/AuthProvider';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        {isAuthenticated ? (
          <Route
            path="/*"
            element={<ProtectedRoutes />}
          />
        ) : (
          <Route path="*" element={<Navigate to="/signin"/>} />
        )}
      </Routes>
    </div>
  );
};

const ProtectedRoutes = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
};

export default App;
