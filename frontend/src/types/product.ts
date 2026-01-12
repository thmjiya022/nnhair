export const ProductCategory = {
    CLOSURES: 'CLOSURES',
    FRONTALS: 'FRONTALS',
    ACCESSORIES: 'ACCESSORIES',
    HEADBAND_WIGS: 'HEADBAND_WIGS',
    PONYTAILS: 'PONYTAILS',
    BRAZILIAN_HAIR: 'BRAZILIAN_HAIR',
    PERUVIAN_HAIR: 'PERUVIAN_HAIR',
    MALAYSIAN_HAIR: 'MALAYSIAN_HAIR',
    CUSTOM_WIGS: 'CUSTOM_WIGS',
} as const;

export type ProductCategory =
    typeof ProductCategory[keyof typeof ProductCategory];

export const HairTexture = {
    STRAIGHT: 'STRAIGHT',
    BODY_WAVE: 'BODY_WAVE',
    DEEP_WAVE: 'DEEP_WAVE',
    KINKY_STRAIGHT: 'KINKY_STRAIGHT',
    WATER_WAVE: 'WATER_WAVE',
    CURLY: 'CURLY',
    KINKY_CURLY: 'KINKY_CURLY',
    NATURAL_CURLY: 'NATURAL_CURLY',
    LOOSE_WAVE: 'LOOSE_WAVE',
    TIGHT_CURLY: 'TIGHT_CURLY',
} as const;

export type HairTexture =
    typeof HairTexture[keyof typeof HairTexture];
    
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    texture: HairTexture;
    stockQuantity: number;
    sku: string;
    weight?: number;
    length?: number;
    material?: string;
    imageUrls: string[];
    isFeatured: boolean;
    isActive: boolean;
    discountPercentage?: number;
    inStock: boolean;
    totalVariants: number;
}

export interface ProductVariant {
    id: string;
    variantName: string;
    variantType: string;
    variantValue: string;
    additionalPrice: number;
    stockQuantity: number;
    skuSuffix: string;
    isActive: boolean;
    productId: number;
}