import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, ShoppingBag } from 'lucide-react';
import { type Product, ProductCategory, HairTexture } from '../../types/product';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';

// Mock data for now
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Luxury Straight Frontal Wig",
        description: "Premium quality frontal wig with natural hairline",
        price: 300,
        originalPrice: 350,
        category: ProductCategory.BRAZILIAN_HAIR,
        texture: HairTexture.STRAIGHT,
        stockQuantity: 10,
        sku: "NNH-FWG-ST-001",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: true,
        isActive: true,
        inStock: true,
        totalVariants: 3,
        discountPercentage: 14,
    },
    {
        id: 2,
        name: "Body Wave Closure Wig",
        description: "Easy-to-wear wig with closure",
        price: 200,
        category: ProductCategory.HEADBAND_WIGS,
        texture: HairTexture.BODY_WAVE,
        stockQuantity: 15,
        sku: "NNH-CWG-BW-002",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: true,
        isActive: true,
        inStock: true,
        totalVariants: 2,
    },
    {
        id: 3,
        name: "Kinky Straight Full Lace",
        description: "Full lace wig with kinky straight texture",
        price: 300,
        originalPrice: 350,
        category: ProductCategory.PERUVIAN_HAIR,
        texture: HairTexture.KINKY_STRAIGHT,
        stockQuantity: 8,
        sku: "NNH-FLG-KS-003",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: true,
        isActive: true,
        inStock: true,
        totalVariants: 4,
        discountPercentage: 14,
    },
    {
        id: 4,
        name: "Water Wave Ponytail",
        description: "Detachable ponytail with water wave texture",
        price: 180,
        category: ProductCategory.PONYTAILS,
        texture: HairTexture.WATER_WAVE,
        stockQuantity: 20,
        sku: "NNH-PTY-WW-004",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: false,
        isActive: true,
        inStock: true,
        totalVariants: 1,
    },
    {
        id: 5,
        name: "Straight Hair Bundles (3 Bundles)",
        description: "Set of 3 straight hair bundles",
        price: 450,
        category: ProductCategory.CLOSURES,
        texture: HairTexture.STRAIGHT,
        stockQuantity: 25,
        sku: "NNH-BDL-ST-005",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: false,
        isActive: true,
        inStock: true,
        totalVariants: 3,
    },
    {
        id: 6,
        name: "Body Wave Bundles (3 Bundles)",
        description: "Set of 3 body wave hair bundles",
        price: 520,
        originalPrice: 600,
        category: ProductCategory.FRONTALS,
        texture: HairTexture.BODY_WAVE,
        stockQuantity: 18,
        sku: "NNH-BDL-BW-006",
        imageUrls: ["https://via.placeholder.com/400x500"],
        isFeatured: true,
        isActive: true,
        inStock: true,
        totalVariants: 3,
        discountPercentage: 13,
    },
];

const Catalog: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState({
        category: searchParams.get('category') as ProductCategory || undefined,
        texture: searchParams.get('texture') as HairTexture || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        inStockOnly: searchParams.get('inStockOnly') === 'true',
        featuredOnly: searchParams.get('featuredOnly') === 'true',
        search: searchParams.get('search') || '',
    });

    const categories = Object.values(ProductCategory);
    const textures = Object.values(HairTexture);

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            let filtered = [...mockProducts];

            if (filters.category) {
                filtered = filtered.filter(p => p.category === filters.category);
            }
            if (filters.texture) {
                filtered = filtered.filter(p => p.texture === filters.texture);
            }
            if (filters.inStockOnly) {
                filtered = filtered.filter(p => p.inStock);
            }
            if (filters.featuredOnly) {
                filtered = filtered.filter(p => p.isFeatured);
            }
            if (filters.search) {
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                    p.description.toLowerCase().includes(filters.search.toLowerCase())
                );
            }
            if (filters.minPrice) {
                filtered = filtered.filter(p => p.price >= filters.minPrice!);
            }
            if (filters.maxPrice) {
                filtered = filtered.filter(p => p.price <= filters.maxPrice!);
            }

            setProducts(filtered);
            setLoading(false);
        }, 500);
    }, [filters]);

    const updateFilter = (key: string, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Update URL params
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
            if (v !== undefined && v !== '' && v !== false) {
                params.set(k, String(v));
            }
        });
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({
            category: undefined,
            texture: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            inStockOnly: false,
            featuredOnly: false,
            search: '',
        });
        setSearchParams({});
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-display font-bold mb-2">ONLINE COLLECTION</h1>
                    <p className="text-gray-600">Our Catalog</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <Filter className="mr-2" size={20} />
                                    Filters
                                </h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-pink-600 hover:text-pink-700"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={filters.search}
                                    onChange={(e) => updateFilter('search', e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 flex items-center justify-between">
                                    Categories
                                    <ChevronDown size={16} />
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.category === category}
                                                onChange={(e) =>
                                                    updateFilter('category', e.target.checked ? category : undefined)
                                                }
                                                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                            />
                                            <span className="ml-2 text-gray-700">{category.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Textures */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Hair Textures</h3>
                                <div className="space-y-2">
                                    {textures.map((texture) => (
                                        <label key={texture} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.texture === texture}
                                                onChange={(e) =>
                                                    updateFilter('texture', e.target.checked ? texture : undefined)
                                                }
                                                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                            />
                                            <span className="ml-2 text-gray-700">{texture.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="flex space-x-4">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice || ''}
                                        onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice || ''}
                                        onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            {/* Other Filters */}
                            <div className="space-y-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.inStockOnly}
                                        onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    />
                                    <span className="ml-2 text-gray-700">In Stock Only</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.featuredOnly}
                                        onChange={(e) => updateFilter('featuredOnly', e.target.checked)}
                                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    />
                                    <span className="ml-2 text-gray-700">Featured Only</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {/* Toolbar */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <div className="text-gray-600 mb-4 sm:mb-0">
                                    Showing {products.length} products
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'
                                                }`}
                                        >
                                            <Grid size={20} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'
                                                }`}
                                        >
                                            <List size={20} />
                                        </button>
                                    </div>
                                    <select className="border rounded-lg p-2">
                                        <option>Newest First</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Best Selling</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                                        <div className="h-48 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                                <div className="text-gray-400 mb-4">No products found</div>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="md:flex">
                                            <div className="md:w-1/4">
                                                <img
                                                    src={product.imageUrls[0]}
                                                    alt={product.name}
                                                    className="w-full h-64 md:h-full object-cover"
                                                />
                                            </div>
                                            <div className="md:w-3/4 p-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                                        <p className="text-gray-600 mb-4">{product.description}</p>
                                                        <div className="flex items-center space-x-2 mb-4">
                                                            <span className="text-lg font-bold">R{product.price.toFixed(2)}</span>
                                                            {product.originalPrice && (
                                                                <span className="text-gray-500 line-through">
                                                                    R{product.originalPrice.toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <span className="text-sm text-gray-500">{product.category.replace('_', ' ')}</span>
                                                            <span className="text-sm text-gray-500">{product.texture.replace('_', ' ')}</span>
                                                            <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'
                                                                }`}>
                                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Button variant="primary" leftIcon={<ShoppingBag size={16} />}>
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;