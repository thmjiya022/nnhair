export interface Product {
    id: string;
    name: string;
    category: string;
    texture: string;
    length?: string;
    color?: string;
    price: number;
    in_stock: boolean;
    featured?: boolean;
    image_url: string;
    images?: string[];
    description?: string;
    created_at?: string;
    updated_at?: string;
}