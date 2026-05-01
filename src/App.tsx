import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import StoreLayout from './components/StoreLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import TrackOrder from './pages/TrackOrder';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/admin/AdminLogin';

import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Staff from './pages/admin/Staff';
import Settings from './pages/admin/Settings';
import POS from './pages/admin/POS';
import Marketing from './pages/admin/Marketing';
import LiveChat from './pages/admin/LiveChat';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
        {/* Public Store Routes */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="category/:id/:sub" element={<Category />} />
          <Route path="product/:id" element={<Category />} /> {/* Placeholder to prevent 404s */}
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="staff" element={<Staff />} />
          <Route path="pos" element={<POS />} />
          <Route path="chat" element={<LiveChat />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
