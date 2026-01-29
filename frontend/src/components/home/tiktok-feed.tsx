import { FaTiktok } from 'react-icons/fa';

const TikTokFeed = () => {

    return (
        <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                        <FaTiktok className="w-4 h-4" />Follow Us</span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-wide text-white">@by.nontando</h2>
                    <p className="text-neutral-400 mt-4">Check out our latest videos on TikTok</p>
                </div>
                <div className="text-center">
                    <a
                        href="https://www.tiktok.com/@by.nontando"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-white transition-all duration-300">
                        <FaTiktok className="w-5 h-5" />Follow us on TikTok</a>
                </div>
            </div>
        </section>
    );
}

export default TikTokFeed;