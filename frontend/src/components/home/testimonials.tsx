import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Thandi M.',
        text: 'Absolutely in love with my frontal wig! The quality is unmatched and it looks so natural.',
        rating: 5
    },
    {
        name: 'Naledi K.',
        text: 'Best hair I have ever purchased. The texture is perfect and lasts beautifully.',
        rating: 5
    },
    {
        name: 'Lerato S.',
        text: 'NN Hair has become my go-to. The customer service and product quality are exceptional.',
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">What Our Clients Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative bg-neutral-900 border border-neutral-800 p-8 hover:border-gold/30 transition-colors duration-300"
                        >
                            <Quote className="w-10 h-10 text-[#d4af37]/20 absolute top-6 right-6" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold text-[#d4af37]" />
                                ))}
                            </div>

                            <p className="text-neutral-300 font-light leading-relaxed mb-6">
                                "{testimonial.text}"
                            </p>

                            <span className="text-sm text-[#d4af37] tracking-wider">{testimonial.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
