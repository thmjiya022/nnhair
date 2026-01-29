import React, { useState, useEffect } from 'react';
import { getProductById } from '../../services/product.service';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { ShoppingBag, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { type Product } from '../../types/product';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const ProductDetail: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState<Product | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                setLoading(true);
                try {
                    const foundProduct = await getProductById(productId);
                    setProduct(foundProduct);
                } catch (error) {
                    console.error('Error loading product:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [productId]);

    const addToCart = () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem('nn_hair_cart') || '[]');
        const existingIndex = cart.findIndex((item: any) => item.id === product.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('nn_hair_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-neutral-400 mb-4">Product not found</p>
                        <Link to={createPageUrl('Catalog')}>
                            <button className="bg-[#d4af37] hover:bg-white text-black px-8 py-3 tracking-widest uppercase transition-colors">
                                Back to Catalog
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const allImages = [product.image_url, ...(product.images || [])].filter(Boolean);

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            {showToast && (
                <div className="fixed top-24 right-6 bg-[#d4af37] text-black px-6 py-3 rounded shadow-lg z-50">
                    Added to cart!
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-12">
                <Link
                    to={createPageUrl('Catalog')}
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#d4af37] transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-3/4 overflow-hidden bg-neutral-900">
                            <img
                                src={allImages[selectedImage] || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-[#d4af37]' : 'border-neutral-800 hover:border-neutral-700'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs text-[#d4af37] tracking-[0.3em] uppercase">
                                {product.category?.replace('-', ' ')}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">{product.name}</h1>
                            <p className="text-3xl text-[#d4af37] mt-6">R{product.price?.toLocaleString()}</p>
                        </div>

                        {product.description && (
                            <p className="text-neutral-300 leading-relaxed">{product.description}</p>
                        )}

                        <div className="border-t border-neutral-800 pt-8 space-y-4">
                            {product.length && (
                                <div className="flex justify-between">
                                    <span className="text-neutral-400">Length</span>
                                    <span className="text-white">{product.length}</span>
                                </div>
                            )}
                            {product.texture && (
                                <div className="flex justify-between">
                                    <span className="text-neutral-400">Texture</span>
                                    <span className="text-white capitalize">{product.texture.replace('-', ' ')}</span>
                                </div>
                            )}
                            {product.color && (
                                <div className="flex justify-between">
                                    <span className="text-neutral-400">Color</span>
                                    <span className="text-white">{product.color}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Availability</span>
                                <span className={product.in_stock ? 'text-green-500 flex items-center gap-2' : 'text-red-500'}>
                                    {product.in_stock ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            In Stock
                                        </>
                                    ) : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        {product.in_stock && (
                            <div className="border-t border-neutral-800 pt-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-neutral-400 tracking-wider uppercase">Quantity</span>
                                    <div className="flex items-center border border-neutral-700">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 hover:bg-neutral-800 transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="px-6 py-2 border-x border-neutral-700">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-2 hover:bg-neutral-800 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-[#d4af37] hover:bg-white text-black py-6 text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3">
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;