import React, { Component } from 'react';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Search from './components/Search';
import Category from './components/Category';
import Logout from './components/Logout';
import Shop from './components/Shop';
import Register from './components/Register';
import Singleproduct from './components/Singleproduct';
import Myorders from './components/Myorders';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Users from './components/admin/Users';
import Categories from './components/admin/Categories';
import Addcategory from './components/admin/Addcategory';
import Addproduct from './components/admin/Addproduct';
import Alogout from './components/admin/Alogout';
import Editcategory from './components/admin/Editcategory';
import Editproduct from './components/admin/Editproduct';
import Orders from './components/admin/Orders';
import Orderdetail from './components/admin/Orderdetail';

function App() {
  return (   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<UserRoute> <Cart /> </UserRoute>} />
      <Route path="/checkout" element={<UserRoute> <Checkout /> </UserRoute>} />
      <Route path="/profile" element={<UserRoute> <Profile /> </UserRoute>} />
      <Route path="/myorders" element={<UserRoute> <Myorders /> </UserRoute>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/shop/" element={<Shop />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category" element={<Category />} />
      {/* <Route path="/category/:id" element={<Category />} />  if you useParams instead of query params*/}
      <Route path="/singleproduct/:id" element={<Singleproduct />} />
      <Route path="/admin/dashboard/" element={<AdminRoute> <Dashboard /> </AdminRoute>} />
      <Route path="/admin/logout/" element={<Alogout />} />
      <Route path="/admin/products/" element={<AdminRoute> <Products /> </AdminRoute>} />
      <Route path="/admin/users/" element={<AdminRoute> <Users /> </AdminRoute>} />
      <Route path="/admin/categories/" element={<AdminRoute> <Categories /> </AdminRoute>} />
      <Route path="/admin/addcategory/" element={<AdminRoute> <Addcategory /> </AdminRoute>} />
      <Route path="/admin/addproduct" element={<AdminRoute> <Addproduct /> </AdminRoute>} />
      <Route path="/admin/editcategory/:id" element={<AdminRoute> <Editcategory /> </AdminRoute>} />
      <Route path="/admin/editproduct/:id" element={<AdminRoute> <Editproduct /> </AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute> <Orders /> </AdminRoute>} />
      <Route path="/admin/orderdetail/:id" element={<AdminRoute> <Orderdetail /> </AdminRoute>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;