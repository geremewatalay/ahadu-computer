import React from 'react';
import { Route, createRoutesFromElements } from 'react-router-dom';

// Layouts
import MainLayout from '../app/layouts/MainLayout';
import AdminLayout from '../app/layouts/AdminLayout';

// Pages
import Home from '../pages/home/Home';
import Products from '../pages/products/Products';
import ProductDetails from '../pages/products/ProductDetails';
import CategoriesPage from '../pages/products/Categories';
import Services from '../pages/services/Services';
import About from '../pages/about/About';
import Support from '../pages/support/Support';
import Contact from '../pages/contact/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Cart from '../pages/cart/Cart';
import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import Orders from '../pages/admin/Orders';
import NotFound from '../pages/NotFound';

// Protected Routes
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = createRoutesFromElements(
  <>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="support" element={<Support />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
    </Route>
    
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<ManageProducts />} />
      <Route path="orders" element={<Orders />} />
    </Route>
    
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </>
);
