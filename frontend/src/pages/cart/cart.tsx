import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { type CartItem } from '../../types/cart-item';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => loadCart();
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const loadCart = () => {
        const savedCart = localStorage.getItem('nn_hair_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    };

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updated = [...cart];
        updated[index].quantity = newQuantity;
        localStorage.setItem('nn_hair_cart', JSON.stringify(updated));
        setCart(updated);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (index: number) => {
        const updated = cart.filter((_, i) => i !== index);
        localStorage.setItem('nn_hair_cart', JSON.stringify(updated));
        setCart(updated);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;

    return <>
            <Navbar />
        <div className="min-h-screen bg-black">
            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">Shopping Cart</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag className="w-16 h-16 text-neutral-700 mx-auto mb-6" />
                        <p className="text-neutral-400 text-lg mb-8">Your cart is empty</p>
                        <Link to={createPageUrl('Catalog')}>
                            <button className="bg-[#d4af37] hover:bg-white text-black tracking-widest uppercase px-8 py-4 transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-6 bg-neutral-900 border border-neutral-800 p-6"
                                >
                                    <img
                                        src={item.image_url || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&q=80'}
                                        alt={item.name}
                                        className="w-24 h-32 object-cover"
                                    />

                                    <div className="flex-1">
                                        <Link
                                            to={createPageUrl(`ProductDetail?id=${item.id}`)}
                                            className="text-lg font-light hover:text-[#d4af37] transition-colors"
                                        >
                                            {item.name}
                                        </Link>

                                        {item.texture && (
                                            <p className="text-xs text-[#d4af37] uppercase tracking-wider mt-2">
                                                {item.texture.replace('-', ' ')}
                                            </p>
                                        )}

                                        <p className="text-neutral-400 mt-2">R{item.price?.toLocaleString()}</p>

                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center border border-neutral-700">
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-neutral-800 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-1 border-x border-neutral-700">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-neutral-800 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-neutral-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg">R{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900 border border-neutral-800 p-8 sticky top-32">
                                <h2 className="text-2xl font-light mb-6 tracking-wide text-white">Order Summary</h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-800">
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Subtotal</span>
                                        <span>R{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Shipping</span>
                                        <span>R{shipping.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl mb-8">
                                    <span>Total</span>
                                    <span className="text-[#d4af37]">R{total.toLocaleString()}</span>
                                </div>

                                <Link to={createPageUrl('Checkout')}>
                                    <button className="w-full bg-[#d4af37] hover:bg-white text-black py-6 text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3">
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>

                                <Link
                                    to={createPageUrl('Catalog')}
                                    className="block text-center text-sm text-neutral-400 hover:text-[#d4af37] transition-colors mt-6 tracking-wider uppercase"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
};

export default Cart;
