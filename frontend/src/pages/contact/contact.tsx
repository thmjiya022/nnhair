import React, { useState } from 'react';
import { createContactMessage } from '../../services/contact.service';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Loader2 } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createContactMessage(formData);
            setShowSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            {showSuccess && (
                <div className="fixed top-24 right-6 bg-[#d4af37] text-black px-6 py-3 rounded shadow-lg z-50 animate-in slide-in-from-right duration-300">
                    Message sent successfully! We'll get back to you soon.
                </div>
            )}

            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Contact Us</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-light mb-6 tracking-wide text-white">Let's Connect</h2>
                            <p className="text-neutral-400 leading-relaxed">
                                Have a question about our products or need styling advice? We're here to help!
                                Reach out to us and our team will get back to you as soon as possible.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-light mb-2 text-white">Phone</h3>
                                    <a href="tel:+27813059401" className="text-neutral-400 hover:text-[#d4af37] transition-colors">
                                        +27 81 305 9401
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-light mb-2 text-white">Email</h3>
                                    <a href="mailto:info@nnhair.co.za" className="text-neutral-400 hover:text-[#d4af37] transition-colors">
                                        info@nnhair.co.za
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-light mb-2 text-white">Location</h3>
                                    <p className="text-neutral-400">
                                        Middelburg, Mpumalanga, South Africa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-light mb-4 text-white">Follow Us</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.tiktok.com/@by.nontando"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                                >
                                    <FaTiktok className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 p-8">
                            <h2 className="text-2xl font-light mb-8 tracking-wide text-white">Send Us a Message</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-neutral-400 text-sm">Name *</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-neutral-400 text-sm">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-neutral-400 text-sm">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-neutral-400 text-sm">Subject *</label>
                                    <input
                                        required
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-neutral-400 text-sm">Message *</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        className="mt-2 w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white rounded min-h-[150px] focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#d4af37] hover:bg-white text-black py-6 text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;