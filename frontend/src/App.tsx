import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Catalog from './pages/catalog/catalog';
import ProductDetail from './pages/product-detail/product-detail';
import Cart from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import OrderSuccess from './pages/order-success/order-sucess';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Account from './pages/auth/account';
import ForgotPassword from './pages/auth/forgot-password';

// Admin pages
import Dashboard from './pages/admin/dashboard';
import Products from './pages/admin/products';
import Orders from './pages/admin/orders';
import Reports from './pages/admin/reports';

// Protected Route component
import ProtectedRoute from './components/protected-route';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Customer-facing routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin routes - protected */}
                <Route path="/admin/dashboard" element={
                    // <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                    // </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                    // <ProtectedRoute requireAdmin={true}>
                        <Products />
                    // </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                    // <ProtectedRoute requireAdmin={true}>
                        <Orders />
                    // </ProtectedRoute>
                } />
                <Route path="/admin/reports" element={
                    // <ProtectedRoute requireAdmin={true}>
                        <Reports />
                    // </ProtectedRoute>
                } />

                {/* Fallback */}
                <Route
                    path="*"
                    element={
                        <div className="min-h-screen bg-black pt-20 text-center text-white">
                            <h1 className="text-4xl font-light mb-4">Page Not Found</h1>
                            <a href="/" className="text-[#d4af37] hover:text-white transition-colors">
                                Return to Home
                            </a>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;