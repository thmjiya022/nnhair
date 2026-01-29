import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type CartItem } from '../types/cart-item';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const Layout: React.FC = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const savedCart = localStorage.getItem('nn_hair_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        const handleCartUpdate = () => {
            const updated = localStorage.getItem('nn_hair_cart');
            if (updated) setCart(JSON.parse(updated));
        };
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    // Determine which nav link is active
    const currentPath = location.pathname;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-black/80 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex flex-col">
                            <span className="text-2xl font-light tracking-[0.3em] text-white">NN HAIR</span>
                            <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">By Nontando</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm tracking-widest uppercase transition-colors duration-300 ${currentPath === link.path ? 'text-[#d4af37]' : 'text-white hover:text-[#d4af37]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link to="/cart" className="relative p-2 text-white hover:text-[#d4af37] transition-colors">
                                <ShoppingBag className="w-5 h-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-black text-xs font-medium rounded-full flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white hover:text-[#d4af37] transition-colors">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black">
                        <div className="flex flex-col h-full p-6">
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-light tracking-[0.3em] text-white">NN HAIR</span>
                                    <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">By Nontando</span>
                                </div>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-3xl font-light tracking-wider text-white hover:text-[#d4af37] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="pt-20">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-neutral-950 border-t border-neutral-800 py-8 text-center text-neutral-500">
                © {new Date().getFullYear()} NN Hair by Nontando. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
