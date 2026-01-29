import { Instagram } from 'lucide-react';

const images = [
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
    'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
    'https://images.unsplash.com/photo-1599351430897-df5d77aec6b5?w=400&q=80',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80',
    'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=400&q=80',
];

export default function InstagramFeed() {
    return (
        <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Follow Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">@nnhair</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {images.map((img, index) => (
                        <a
                            key={index}
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square overflow-hidden"
                        >
                            <img
                                src={img}
                                alt="Instagram"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
