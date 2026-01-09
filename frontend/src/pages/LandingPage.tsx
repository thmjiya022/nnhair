// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Heart, CheckCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const LandingPage: React.FC = () => {
    const { isAuthenticated, user } = useAuthStore();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                            PREMIUM HAIR COLLECTION
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                            Elevate Your Beauty. Discover our curated collection of premium wigs and extensions,
                            crafted for the modern woman.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/catalog"
                                className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
                            >
                                SHOP COLLECTION
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                            >
                                OUR STORY
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Pieces</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our handpicked selection of premium hair products
                        </p>
                    </div>

                    {/* Featured Products Grid - Placeholder */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-pink-100 to-purple-100"></div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">Luxury Straight Frontal Wig</h3>
                                        <span className="text-sm text-gray-500">STRAIGHT</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">Premium quality frontal wig with natural hairline</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold">R300</span>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-display font-bold text-center mb-8">COLLECTIONS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="text-pink-600" size={24} />
                                </div>
                                <h4 className="text-xl font-semibold mb-3">Frontal Wigs</h4>
                                <p className="text-gray-600 mb-4">Natural-looking wigs with frontal lace for versatile styling</p>
                                <Link to="/catalog" className="text-pink-600 font-semibold hover:text-pink-700">
                                    Shop Now →
                                </Link>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="text-purple-600" size={24} />
                                </div>
                                <h4 className="text-xl font-semibold mb-3">Closure Wigs</h4>
                                <p className="text-gray-600 mb-4">Easy-to-wear wigs with closure for a natural hairline</p>
                                <Link to="/catalog" className="text-purple-600 font-semibold hover:text-purple-700">
                                    Shop Now →
                                </Link>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Truck className="text-blue-600" size={24} />
                                </div>
                                <h4 className="text-xl font-semibold mb-3">Bundles</h4>
                                <p className="text-gray-600 mb-4">High-quality hair bundles for custom installations</p>
                                <Link to="/catalog" className="text-blue-600 font-semibold hover:text-blue-700">
                                    Shop Now →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Our Clients Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hear from our satisfied customers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "Absolutely in love with my frontal wig! The quality is unmatched and it looks so natural."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    T
                                </div>
                                <div>
                                    <p className="font-semibold">Thabi M.</p>
                                    <p className="text-sm text-gray-500">Johannesburg</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "Best hair I have ever purchased. The texture is perfect and lasts beautifully."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    N
                                </div>
                                <div>
                                    <p className="font-semibold">Naledi K.</p>
                                    <p className="text-sm text-gray-500">Cape Town</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "N N Hair has become my go-to. The customer service and product quality are exceptional."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    L
                                </div>
                                <div>
                                    <p className="font-semibold">Lerato S.</p>
                                    <p className="text-sm text-gray-500">Durban</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What We Stand For</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <CheckCircle className="text-pink-600" size={24} />
                            </div>
                            <h4 className="font-semibold text-lg mb-2">Premium Quality</h4>
                            <p className="text-gray-600">Only the finest materials and craftsmanship</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Heart className="text-pink-600" size={24} />
                            </div>
                            <h4 className="font-semibold text-lg mb-2">Customer Care</h4>
                            <p className="text-gray-600">Dedicated support throughout your journey</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Shield className="text-pink-600" size={24} />
                            </div>
                            <h4 className="font-semibold text-lg mb-2">Authenticity</h4>
                            <p className="text-gray-600">100% genuine, ethically sourced hair</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Star className="text-pink-600" size={24} />
                            </div>
                            <h4 className="font-semibold text-lg mb-2">Community</h4>
                            <p className="text-gray-600">Empowering women to feel confident</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Elevating Beauty, One Wig at a Time
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        We believe that every woman deserves to feel beautiful and confident.
                        Join our community and discover premium hair solutions that enhance your natural beauty.
                    </p>
                    {isAuthenticated ? (
                        <div className="space-y-4">
                            <p className="text-lg">Welcome back, {user?.firstName || user?.username}!</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/profile"
                                    className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    View Profile
                                </Link>
                                <Link
                                    to="/catalog"
                                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Join Now
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Social Media Section */}
            <section className="py-12 bg-white border-t">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">FOLLOW US</h3>
                        <p className="text-gray-600 mb-6">Stay updated with our latest collections and offers</p>
                        <div className="flex justify-center space-x-6">
                            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-sky-500 hover:text-sky-600 transition-colors">
                                <Twitter size={24} />
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">@nnhair</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;