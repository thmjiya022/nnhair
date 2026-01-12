import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, Star } from 'lucide-react';
import type{ Product } from '../../types/product';
import { useCartStore } from '../../stores/cartStore';


interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrls[0]
        });
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Implement quick view modal
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Implement wishlist functionality
    };

    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">
                    <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                        {product.isFeatured && (
                            <span className="bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                        {product.discountPercentage && product.discountPercentage > 0 && (
                            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                -{product.discountPercentage}%
                            </span>
                        )}
                        {!product.inStock && (
                            <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                        <button
                            onClick={handleAddToWishlist}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                            title="Add to wishlist"
                        >
                            <Heart size={18} className="text-gray-700" />
                        </button>
                        <button
                            onClick={handleQuickView}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                            title="Quick view"
                        >
                            <Eye size={18} className="text-gray-700" />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`absolute bottom-0 left-0 right-0 ${product.inStock
                                ? 'bg-gray-900 hover:bg-black'
                                : 'bg-gray-400 cursor-not-allowed'
                            } text-white py-3 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    >
                        <div className="flex items-center justify-center">
                            <ShoppingBag size={18} className="mr-2" />
                            {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </div>
                    </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                        <span className="text-sm text-gray-500">{product.texture.replace('_', ' ')}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-pink-600">R{product.price.toFixed(2)}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-gray-500 line-through">R{product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    className={`${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;