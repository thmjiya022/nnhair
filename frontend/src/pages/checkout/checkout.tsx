import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils/create-page-url';
import { createOrder } from '../../services/order.service';
import { getCurrentUser, getUserProfile } from '../../services/auth.service';
import {
    CreditCard,
    Banknote,
    Package,
    CheckCircle2,
    Loader2,
    Building2,
    Wallet
} from 'lucide-react';
import { type CartItem } from '../../types/cart-item';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        city: '',
        postal_code: '',
        province: '',
        payment_method: 'eft',
        notes: ''
    });

    useEffect(() => {
        loadUserAndCart();
    }, []);

    const loadUserAndCart = async () => {
        setLoading(true);

        // Check for cart
        const savedCart = localStorage.getItem('nn_hair_cart');
        if (!savedCart || JSON.parse(savedCart).length === 0) {
            navigate(createPageUrl('Catalog'));
            return;
        }

        const parsed = JSON.parse(savedCart);
        setCart(parsed);

        // Check authentication
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            // Redirect to login with return URL
            navigate('/login?returnUrl=/checkout');
            return;
        }

        setUser(currentUser);

        // Load user profile
        const profile = await getUserProfile(currentUser.id);
        if (profile) {
            setUserProfile(profile);
            setFormData(prev => ({
                ...prev,
                customer_name: profile.full_name || '',
                customer_email: currentUser.email || '',
                customer_phone: profile.phone || '',
                shipping_address: profile.address || '',
                city: profile.city || '',
                postal_code: profile.postal_code || '',
                province: profile.province || ''
            }));
        }

        setLoading(false);
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            ...formData,
            items: cart.map(item => ({
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            subtotal,
            shipping,
            total,
            payment_status: 'pending',
            order_status: 'pending'
        };

        try {
            await createOrder(orderData);
            localStorage.removeItem('nn_hair_cart');
            window.dispatchEvent(new Event('cartUpdated'));
            navigate(createPageUrl('OrderSuccess'));
        } catch (error) {
            console.error('Order creation failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const paymentMethods = [
        {
            value: 'eft',
            icon: Building2,
            label: 'EFT/Bank Transfer',
            description: 'Pay directly from your bank account'
        },
        {
            value: 'payfast',
            icon: CreditCard,
            label: 'PayFast',
            description: 'Instant EFT and card payments'
        },
        {
            value: 'cash-on-delivery',
            icon: Wallet,
            label: 'Cash on Delivery',
            description: 'Pay when you receive your order'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-neutral-400">Loading checkout...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">Checkout</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-xl font-light mb-6 tracking-wide text-white">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-neutral-400 text-sm">Full Name *</label>
                                    <input
                                        required
                                        value={formData.customer_name}
                                        onChange={(e) => handleInputChange('customer_name', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="text-neutral-400 text-sm">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.customer_email}
                                        onChange={(e) => handleInputChange('customer_email', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-neutral-400 text-sm">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.customer_phone}
                                        onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-xl font-light mb-6 tracking-wide text-white">Shipping Address</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-neutral-400 text-sm">Street Address *</label>
                                    <input
                                        required
                                        value={formData.shipping_address}
                                        onChange={(e) => handleInputChange('shipping_address', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="text-neutral-400 text-sm">City *</label>
                                        <input
                                            required
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-neutral-400 text-sm">Postal Code *</label>
                                        <input
                                            required
                                            value={formData.postal_code}
                                            onChange={(e) => handleInputChange('postal_code', e.target.value)}
                                            className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-neutral-400 text-sm">Province *</label>
                                        <select
                                            required
                                            value={formData.province}
                                            onChange={(e) => handleInputChange('province', e.target.value)}
                                            className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded"
                                        >
                                            <option value="">Select Province</option>
                                            <option value="Gauteng">Gauteng</option>
                                            <option value="Western Cape">Western Cape</option>
                                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                            <option value="Eastern Cape">Eastern Cape</option>
                                            <option value="Free State">Free State</option>
                                            <option value="Mpumalanga">Mpumalanga</option>
                                            <option value="Limpopo">Limpopo</option>
                                            <option value="North West">North West</option>
                                            <option value="Northern Cape">Northern Cape</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-xl font-light mb-6 tracking-wide text-white">Payment Method</h2>
                            <div className="space-y-4">
                                {paymentMethods.map(({ value, icon: Icon, label, description }) => (
                                    <label
                                        key={value}
                                        className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-colors ${formData.payment_method === value
                                                ? 'border-[#d4af37] bg-neutral-950'
                                                : 'border-neutral-800 hover:border-neutral-700'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={value}
                                            checked={formData.payment_method === value}
                                            onChange={(e) => handleInputChange('payment_method', e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-[#d4af37]" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-white">{label}</div>
                                            <div className="text-sm text-neutral-400 mt-1">{description}</div>
                                        </div>
                                        {formData.payment_method === value && (
                                            <CheckCircle2 className="w-6 h-6 text-[#d4af37]" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Order Notes */}
                        <div className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-xl font-light mb-6 tracking-wide text-white">Order Notes (Optional)</h2>
                            <textarea
                                placeholder="Add any special instructions for your order..."
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded min-h-[100px]"
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-900 border border-neutral-800 p-8 sticky top-32">
                            <h2 className="text-2xl font-light mb-6 tracking-wide text-white">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-neutral-800">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <div className="text-neutral-400">
                                            <span>{item.name}</span>
                                            <span className="text-xs block">× {item.quantity}</span>
                                        </div>
                                        <span>R{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#d4af37] hover:bg-white text-black py-6 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Place Order'
                                )}
                            </button>

                            <p className="text-xs text-neutral-500 text-center mt-4">
                                By placing your order, you agree to our Terms of Service
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;