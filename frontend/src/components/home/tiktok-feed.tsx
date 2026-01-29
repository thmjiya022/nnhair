import { FaTiktok } from 'react-icons/fa';

const TikTokFeed = () => {
    // TikTok videos/thumbnails would come from your TikTok API integration
    const videos = [
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
        'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
        'https://images.unsplash.com/photo-1599351430897-df5d77aec6b5?w=400&q=80',
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80',
        'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=400&q=80',
    ];

    return (
        <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                        <FaTiktok className="w-4 h-4" />
                        Follow Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">@by.nontando</h2>
                    <p className="text-neutral-400 mt-4">Check out our latest videos on TikTok</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {videos.map((video, index) => (
                        <a
                            key={index}
                            href="https://www.tiktok.com/@by.nontando"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square overflow-hidden"
                        >
                            <img
                                src={video}
                                alt="TikTok video thumbnail"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <FaTiktok className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://www.tiktok.com/@by.nontando"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition-all duration-300"
                    >
                        <FaTiktok className="w-5 h-5" />
                        Follow us on TikTok
                    </a>
                </div>
            </div>
        </section>
    );
}

export default TikTokFeed;