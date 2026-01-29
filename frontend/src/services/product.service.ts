import { supabase, handleSupabaseError } from "../lib/supabase";
import { type Product } from "../types/product";
import { type ProductFilters } from "../types/product-filters";

/**
 * Fetch products from Supabase with optional filters
 */
export const getProducts = async (filters: ProductFilters = {}): Promise<Product[]> => {
    try {
        let query = supabase
            .from('products')
            .select('*');

        // Apply filters
        if (filters.category && filters.category !== 'all') {
            query = query.eq('category', filters.category);
        }

        if (filters.texture && filters.texture !== 'all') {
            query = query.eq('texture', filters.texture);
        }

        if (filters.featured) {
            query = query.eq('featured', true);
        }

        // Apply sorting
        if (filters.sortBy) {
            const sortField = filters.sortBy.replace('-', '');
            const isDescending = filters.sortBy.startsWith('-');

            if (sortField === 'price') {
                query = query.order('price', { ascending: !isDescending });
            } else if (sortField === 'created_date') {
                query = query.order('created_at', { ascending: !isDescending });
            }
        } else {
            // Default sorting by created_at descending
            query = query.order('created_at', { ascending: false });
        }

        // Apply limit
        if (filters.limit) {
            query = query.limit(filters.limit);
        }

        const { data, error } = await query;

        if (error) {
            handleSupabaseError(error);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

/**
 * Create a new product (Admin only)
 */
export const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
};

/**
 * Update a product (Admin only)
 */
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

/**
 * Delete a product (Admin only)
 */
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            handleSupabaseError(error);
        }

        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};