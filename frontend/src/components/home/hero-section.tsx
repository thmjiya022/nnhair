import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // trigger fade-in on mount
        setFadeIn(true);

        // simple scroll indicator animation
        const interval = setInterval(() => {
            setScrollY((prev) => (prev === 10 ? 0 : 10));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
            </div>

            {/* Content */}
            <div
                className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-800 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                <span className="inline-block text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-6">
                    Premium Hair Collection
                </span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6 text-white">
                    Elevate Your
                    <span className="block mt-2 italic font-serif text-white">Beauty</span>
                </h1>

                <p className="text-neutral-300 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed">
                    Discover our curated collection of premium wigs and extensions, crafted for the modern woman.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to={createPageUrl('Catalog')}
                        className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition-all duration-300"
                    >
                        Shop Collection
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to={createPageUrl('About')}
                        className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-[#d4af37] transition-all duration-300"
                    >
                        Our Story
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-transform duration-500"
                style={{ transform: `translate(-50%, ${scrollY}px)` }}
            >
                <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
            </div>
        </section>
    );
};

export default HeroSection;
