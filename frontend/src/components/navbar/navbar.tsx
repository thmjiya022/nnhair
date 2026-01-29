import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth.service';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [cartCount, setCartCount] = useState(0);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'CATALOG', href: '/catalog' },
        { name: 'ABOUT', href: '/about' },
        { name: 'CONTACT', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Load user
        const loadUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };
        loadUser();

        // Load cart count
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('nn_hair_cart') || '[]');
            setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
        };
        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/95 backdrop-blur-sm border-b border-neutral-800 shadow-lg'
            : 'bg-black border-b border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#d4af37] transition-colors">
                                NN HAÏR
                            </h1>
                            <p className="text-xs text-[#d4af37] -mt-1 tracking-[0.05em]">
                                By Nontando
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-neutral-300 hover:text-[#d4af37] font-light text-sm uppercase tracking-widest transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center gap-6">
                        <Link to="/cart" className="relative">
                            <ShoppingBag className="w-6 h-6 text-neutral-300 hover:text-[#d4af37] transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#d4af37] text-black text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <Link to="/account" className="text-neutral-300 hover:text-[#d4af37] transition-colors">
                                <User className="w-6 h-6" />
                            </Link>
                        ) : (
                            <Link to="/login" className="text-neutral-300 hover:text-[#d4af37] transition-colors text-sm uppercase tracking-widest">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-neutral-300 hover:text-[#d4af37] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-neutral-800 py-6 animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-neutral-300 hover:text-[#d4af37] font-light text-sm uppercase tracking-widest py-2 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {!user && (
                                <Link
                                    to="/login"
                                    className="text-neutral-300 hover:text-[#d4af37] font-light text-sm uppercase tracking-widest py-2 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    SIGN IN
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;