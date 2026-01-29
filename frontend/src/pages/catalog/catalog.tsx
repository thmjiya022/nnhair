import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product.service';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { ShoppingBag, SlidersHorizontal, Loader2 } from 'lucide-react';
import { type Product } from '../../types/product';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const Catalog: React.FC = () => {
    const [filters, setFilters] = useState({
        category: 'all',
        texture: 'all',
        sortBy: '-created_date'
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    useEffect(() => {
        if (categoryParam) {
            setFilters(prev => ({ ...prev, category: categoryParam }));
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const filtered = await getProducts({
                    category: filters.category !== 'all' ? filters.category : undefined,
                    texture: filters.texture !== 'all' ? filters.texture : undefined,
                    sortBy: filters.sortBy
                });
                console.log('Fetched products:', filtered);

                setProducts(filtered);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

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
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Premium Collection</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Our Catalog</h1>
                </div>
            </div>

            <div className="border-b border-neutral-800 bg-neutral-900/50 sticky top-20 z-40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters:</span>
                        </div>

                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-white rounded"
                        >
                            <option value="all">All Categories</option>
                            <option value="frontal">Frontal</option>
                            <option value="closure">Closure</option>
                            <option value="full-lace">Full Lace</option>
                            <option value="headband">Headband</option>
                            <option value="ponytail">Ponytail</option>
                            <option value="bundles">Bundles</option>
                        </select>

                        <select
                            value={filters.texture}
                            onChange={(e) => setFilters({ ...filters, texture: e.target.value })}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-white rounded"
                        >
                            <option value="all">All Textures</option>
                            <option value="straight">Straight</option>
                            <option value="body-wave">Body Wave</option>
                            <option value="deep-wave">Deep Wave</option>
                            <option value="curly">Curly</option>
                            <option value="kinky-straight">Kinky Straight</option>
                            <option value="water-wave">Water Wave</option>
                        </select>

                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-white rounded ml-auto"
                        >
                            <option value="-created_date">Newest First</option>
                            <option value="created_date">Oldest First</option>
                            <option value="price">Price: Low to High</option>
                            <option value="-price">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-400">No products found with the selected filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
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

                                        {!product.in_stock && (
                                            <div className="absolute top-4 left-4 bg-neutral-900 text-white px-3 py-1 text-xs tracking-wider">
                                                OUT OF STOCK
                                            </div>
                                        )}

                                        {product.in_stock && (
                                            <button
                                                onClick={(e) => addToCart(e, product)}
                                                className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-sm tracking-widest uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-[#d4af37] uppercase tracking-wider">
                                            {product.texture?.replace('-', ' ')}
                                        </span>
                                        <h3 className="text-lg font-light group-hover:text-[#d4af37] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-neutral-400">R{product.price?.toLocaleString()}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Catalog;