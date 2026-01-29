import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { CheckCircle2, Home, Package } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const OrderSuccess: React.FC = () => {
    return <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            
            <div className="max-w-2xl w-full text-center">
                <div className="bg-neutral-900 border border-neutral-800 p-12">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-white">Thank You!</h1>
                    <p className="text-xl text-neutral-300 mb-8">Your order has been received</p>

                    {/* Info Box */}
                    <div className="bg-neutral-950 border border-neutral-800 p-6 mb-8">
                        <p className="text-neutral-400 mb-2">
                            We'll send you a confirmation email shortly with your order details.
                        </p>
                        <p className="text-neutral-400">
                            You'll receive payment instructions and tracking information once your order is confirmed.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={createPageUrl('Home')}>
                            <button className="bg-[#d4af37] hover:bg-white text-black tracking-widest uppercase flex items-center gap-2 px-8 py-4 transition-colors">
                                <Home className="w-4 h-4" />
                                Back to Home
                            </button>
                        </Link>
                        <Link to={createPageUrl('Catalog')}>
                            <button className="border border-neutral-700 text-white hover:bg-neutral-800 tracking-widest uppercase flex items-center gap-2 px-8 py-4 transition-colors">
                                <Package className="w-4 h-4" />
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
};

export default OrderSuccess;
