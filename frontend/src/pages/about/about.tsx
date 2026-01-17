import { Award, Heart, Sparkles, Users} from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import thisImage from '../images/nnhairGold.jpg'

const About = () => {
    const values = [
        {
            icon: <Award className="w-10 h-10" />,
            title: "Premium Quality",
            description: "Only the finest materials and craftsmanship"
        },
        {
            icon: <Heart className="w-10 h-10" />,
            title: "Customer Care",
            description: "Dedicated support throughout your journey"
        },
        {
            icon: <Sparkles className="w-10 h-10" />,
            title: "Authenticity",
            description: "100% genuine, ethically sourced hair"
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Community",
            description: "Empowering women to feel confident"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <section className="relative min-h-[90vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={thisImage}
                        alt="NN Hair Salon - Premium Wigs and Extensions"
                        className="h-full object-cover "/>
                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">

                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                    <div className="w-6 h-10 border-2 border-[#d4af37] rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-[#d4af37] rounded-full"></div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                    <p className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase mb-4 sm:mb-6 font-medium">
                        OUR STORY
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-wide">
                        NN HAIR
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-12 sm:mb-16 font-light">
                        By Nontando
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200">
                        NN Hair was founded with a vision to provide every woman with access to premium quality hair
                        extensions and wigs that celebrate natural beauty and boost confidence.
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400">
                        Founded by Nontando, our brand is built on the pillars of quality, authenticity, and exceptional customer
                        service. We carefully curate each piece in our collection to ensure that you receive only the finest hair
                        products that look natural, feel luxurious, and last.
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400">
                        Whether you're looking for a dramatic transformation or a subtle enhancement, NN Hair is here to help
                        you express your unique style with confidence.
                    </p>
                </div>
            </section>
            <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <p className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase mb-3 sm:mb-4 font-medium">
                            OUR VALUES
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
                            What We Stand For
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group text-center transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:shadow-xl rounded-xl p-6"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 text-[#d4af37] transition-all duration-300 group-hover:text-[#f0c959]">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[#d4af37] text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase mb-4 sm:mb-6 font-medium">
                        OUR MISSION
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-wide">
                        Elevating Beauty, One Wig at a Time
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto">
                        We believe that every woman deserves to feel beautiful and confident. Our mission is to provide
                        premium hair solutions that enhance your natural beauty and help you express your authentic
                        self with pride.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default About;