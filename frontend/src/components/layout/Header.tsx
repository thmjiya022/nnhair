import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'CATALOG', path: '/catalog' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-display font-bold tracking-wider">
                            <span className="text-gray-900">N N H A I R</span>
                            <span className="text-sm block font-sans font-normal text-gray-600">BY NONTANDO</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-6">
                        {/* Search */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-600 hover:text-pink-600 transition-colors"
                        >
                            <Search size={20} />
                        </button>

                        {/* User Account */}
                        <div className="relative group">
                            <button className="text-gray-600 hover:text-pink-600 transition-colors">
                                <User size={22} />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                {isAuthenticated ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 border-b">
                                            <p className="font-medium">{user?.firstName || user?.username}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                                        >
                                            <LogOut size={16} className="inline mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-gray-700 hover:text-pink-600 font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            className="block py-2 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="py-2 text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block py-2 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block py-2 text-gray-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4">
                        <div className="container mx-auto">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="flex-1 p-3 border-b-2 border-gray-300 focus:border-pink-600 outline-none"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="ml-4 text-gray-600 hover:text-gray-800"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;