import { Phone, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Footer = () =>  {
    const currentYear = new Date().getFullYear();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Catalog', href: '/catalog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const contactItems = [
        {
            icon: <Phone size={20} className="text-gray-400" />,
            text: '+27 81 305 9401',
            href: 'tel:+27000000000',
            isLink: false,
        },
        {
            icon: <Mail size={20} className="text-gray-400" />,
            text: 'info@nnhair.co.za',
            href: 'mailto:info@nnhair.co.za',
            isLink: true,
        },
        {
            icon: <FaTiktok size={20} className="text-gray-400" />,
            text: '@by.nontando',
            href: 'https://www.tiktok.com/@by.nontando',
            isLink: true,
            isExternal: true,
        },
    ];

    return (
        <footer className="bg-black text-white py-12 px-4 md:px-8 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-wide">NN HAIR</h2>
                            <p className="text-sm text-[#d4af37]">By Nontando</p>
                        </div>
                        <p className="text-gray-400 max-w-xs">
                            Premium quality wigs and hair extensions. Elevate your beauty with our curated collection of luxurious hair pieces.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">CONTACT</h3>
                        <ul className="space-y-3">
                            {contactItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    {item.icon}
                                    {item.isLink ? (
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                                            target={item.isExternal ? '_blank' : '_self'}
                                            rel={item.isExternal ? 'noopener noreferrer' : ''}
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">{item.text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} NN Hair by Nontando. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;