import { useState } from 'react';

const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Products', href: '/admin/products' },
        { name: 'Orders', href: '/admin/orders' },
        { name: 'Reports', href: '/admin/reports' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-black shadow-lg shadow-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-white tracking-tight">NN HAIR Admin</h1>
                    <p className="text-xs text-[#d4af37] -mt-1">Management Panel</p>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-[#d4af37] font-medium text-sm uppercase tracking-wide transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
