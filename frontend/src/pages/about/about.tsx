import React from 'react';
import { Heart, Award, Sparkles, Users } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

interface ValueItem {
    icon: typeof Award;
    title: string;
    description: string;
}

const About: React.FC = () => {
    const values: ValueItem[] = [
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'Only the finest materials and craftsmanship'
        },
        {
            icon: Heart,
            title: 'Customer Care',
            description: 'Dedicated support throughout your journey'
        },
        {
            icon: Sparkles,
            title: 'Authenticity',
            description: '100% genuine, ethically sourced hair'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Empowering women to feel confident'
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            <Navbar/>
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
                        alt="About Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Our Story</span>
                    <h1 className="text-5xl md:text-7xl font-light mt-4 tracking-wide text-white">About NN Hair</h1>
                    <p className="text-xl text-neutral-300 mt-6 max-w-2xl mx-auto">By Nontando</p>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
                <p className="text-xl text-neutral-300 leading-relaxed">
                    NN Hair was founded with a vision to provide every woman with access to premium quality hair extensions and wigs that celebrate natural beauty and boost confidence.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                    Founded by Nontando, our brand is built on the pillars of quality, authenticity, and exceptional customer service. We carefully curate each piece in our collection to ensure that you receive only the finest hair products that look natural, feel luxurious, and last.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                    Whether you're looking for a dramatic transformation or a subtle enhancement, NN Hair is here to help you express your unique style with confidence.
                </p>
            </div>

            {/* Values Section */}
            <div className="bg-neutral-900 border-y border-neutral-800 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Our Values</span>
                        <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">What We Stand For</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <h3 className="text-xl font-light mb-3 text-white">{value.title}</h3>
                                <p className="text-neutral-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Our Mission</span>
                <h2 className="text-4xl md:text-5xl font-light mt-6 mb-8 tracking-wide text-white">
                    Elevating Beauty, One Wig at a Time
                </h2>
                <p className="text-xl text-neutral-300 leading-relaxed">
                    We believe that every woman deserves to feel beautiful and confident. Our mission is to provide premium hair solutions that enhance your natural beauty and help you express your authentic self with pride.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default About;
