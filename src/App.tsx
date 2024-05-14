import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/products/Products';
import AddProduct from './pages/addProducts/AddProducts';
import Orders from './pages/orders/Orders';
import Users from './pages/users/Users';
import Categories from './pages/categories/Categories';
import SignIn from './pages/signIn/SignIn';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import EditProduct from './pages/editProducts/EditProducts';
const App = () => {


  return (
    <div>
      <Routes>
      <Route path="/signin" element={<SignIn />} />
        <Route element={<AuthOutlet fallbackPath='/signin' />}>
        <Route
            path="/*"
            element={<ProtectedRoutes />}
          />
        </Route>
      </Routes>
    </div>
  );
};



const ProtectedRoutes = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'></div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};
export default App;
