import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { type Product } from '../../types/product';

interface FeaturedProductsProps {
    products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
    const addToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        const cart = JSON.parse(localStorage.getItem('nn_hair_cart') || '[]');
        const existingIndex = cart.findIndex((item: any) => item.id === product.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('nn_hair_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Curated Selection</span>
                        <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">Featured Pieces</h2>
                    </div>
                    <Link
                        to={createPageUrl('Catalog')}
                        className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-[#d4af37] transition-colors mt-6 md:mt-0"
                    >
                        View All Products
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                        <div key={product.id}>
                            <Link
                                to={createPageUrl(`ProductDetail?id=${product.id}`)}
                                className="group block"
                            >
                                <div className="relative aspect-3/4 overflow-hidden bg-neutral-900 mb-4">
                                    <img
                                        src={product.image_url || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                                    {/* Quick Add Button */}
                                    <button
                                        onClick={(e) => addToCart(e, product)}
                                        className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-sm tracking-widest uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs text-[#d4af37] uppercase tracking-wider">
                                        {product.texture?.replace('-', ' ')}
                                    </span>
                                    <h3 className="text-lg font-light text-white group-hover:text-[#d4af37] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-neutral-400">R{product.price?.toLocaleString()}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
