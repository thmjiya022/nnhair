import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product.service';
import { type Product } from '../../types/product';
import HeroSection from '../../components/home/hero-section';
import FeaturedProducts from '../../components/home/featured-products';
import CategoryShowcase from '../../components/home/catagory-showcase';
import Testimonials from '../../components/home/testimonials';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import TikTokFeed from '../../components/home/tiktok-feed';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const featuredProducts = await getProducts({ featured: true, limit: 8 });
                setProducts(featuredProducts);
            } catch (error) {
                console.error('Error loading featured products:', error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeaturedProducts products={products} />
            <CategoryShowcase />
            <Testimonials />
            <TikTokFeed />
            <Footer />
        </div>
    );
};

export default Home;