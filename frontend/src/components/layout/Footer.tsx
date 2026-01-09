import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const categories = [
        { name: 'Frontal Wigs', path: '/catalog?category=FRONTAL_WIGS' },
        { name: 'Closure Wigs', path: '/catalog?category=CLOSURE_WIGS' },
        { name: 'Bundles', path: '/catalog?category=BUNDLES' },
        { name: 'Accessories', path: '/catalog?category=ACCESSORIES' },
    ];

    const policies = [
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Return Policy', path: '/returns' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">N N H A I R</h3>
                        <p className="text-gray-300 mb-6">
                            Premium quality wigs and hair extensions. Elevate your beauty with our curated collection
                            of luxurious hair pieces.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">QUICK LINKS</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-gray-300 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">CATEGORIES</h4>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <Link to={category.path} className="text-gray-300 hover:text-white transition-colors">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">CONTACT</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Phone size={18} className="mt-1 text-gray-400" />
                                <span className="text-gray-300">+27 00 000 0000</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail size={18} className="mt-1 text-gray-400" />
                                <span className="text-gray-300">info@nnhair.co.za</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="mt-1 text-gray-400" />
                                <span className="text-gray-300">Johannesburg, South Africa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {currentYear} N N Hair by Nontando. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            {policies.map((policy) => (
                                <Link
                                    key={policy.name}
                                    to={policy.path}
                                    className="text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    {policy.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;