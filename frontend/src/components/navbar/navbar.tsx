import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'CATALOG', href: '/catalog' },
        { name: 'ABOUT', href: '/about' },
        { name: 'CONTACT', href: '/contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-black shadow-lg shadow-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-white tracking-tight">NN HAIR</h1>
                            <p className="text-xs text-[#d4af37] -mt-1">By Nontando</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-[#d4af37] font-medium text-sm uppercase tracking-wide transition-colors duration-200">
                                {link.name}
                            </a>
                        ))}

                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden border-t border-zinc-800 py-4">
                        <div className="flex flex-col space-y-4 px-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-[#d4af37] font-medium text-sm uppercase py-2 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;