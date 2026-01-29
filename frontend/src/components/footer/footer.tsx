import { Phone, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        { name: 'HOME', href: '/' },
        { name: 'CATALOG', href: '/catalog' },
        { name: 'ABOUT', href: '/about' },
        { name: 'CONTACT', href: '/contact' },
    ];

    const contactItems = [
        {
            icon: <Phone size={20} className="text-neutral-400" />,
            text: '+27 81 305 9401',
            href: 'tel:+27813059401',
            isLink: true,
        },
        {
            icon: <Mail size={20} className="text-neutral-400" />,
            text: 'info@nnhair.co.za',
            href: 'mailto:info@nnhair.co.za',
            isLink: true,
        },
        {
            icon: <FaTiktok size={20} className="text-neutral-400" />,
            text: '@by.nontando',
            href: 'https://www.tiktok.com/@by.nontando',
            isLink: true,
            isExternal: true,
        },
    ];

    return (
        <footer className="bg-black border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">NN HAÏR</h2>
                            <p className="text-sm text-[#d4af37] tracking-[0.05em]">By Nontando</p>
                        </div>
                        <p className="text-neutral-400 leading-relaxed max-w-xs">
                            Premium quality wigs and hair extensions. Elevate your beauty with our curated collection of luxurious hair pieces.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-light mb-6 text-white uppercase tracking-widest">QUICK LINKS</h3>
                        <ul className="space-y-4">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-[#d4af37] font-light text-sm uppercase tracking-widest transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-light mb-6 text-white uppercase tracking-widest">CONTACT</h3>
                        <ul className="space-y-5">
                            {contactItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        {item.isLink ? (
                                            <a
                                                href={item.href}
                                                className="text-neutral-400 hover:text-[#d4af37] transition-colors duration-300"
                                                target={item.isExternal ? '_blank' : '_self'}
                                                rel={item.isExternal ? 'noopener noreferrer' : ''}
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span className="text-neutral-400">{item.text}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-neutral-800 mt-12 pt-8">
                    <p className="text-neutral-500 text-sm text-center">
                        © {currentYear} NN Hair by Nontando. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;