import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { ArrowUpRight } from 'lucide-react';

interface Category {
    name: string;
    slug: string;
    image: string;
    description: string;
}

const categories: Category[] = [
    {
        name: 'Frontal Wigs',
        slug: 'frontal',
        image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=80',
        description: 'Natural hairline perfection'
    },
    {
        name: 'Closure Wigs',
        slug: 'closure',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
        description: 'Seamless & versatile'
    },
    {
        name: 'Bundles',
        slug: 'bundles',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        description: 'Premium raw hair'
    },
];

const CategoryShowcase: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Collections</span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">Shop by Category</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.slug}>
                            <Link
                                to={createPageUrl(`Catalog?category=${category.slug}`)}
                                className="group relative block aspect-4/5 overflow-hidden"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="text-[#d4af37] text-xs tracking-wider uppercase">{category.description}</span>
                                    <div className="flex items-end justify-between mt-2">
                                        <h3 className="text-2xl font-light text-white">{category.name}</h3>
                                        <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;