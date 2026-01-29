import { supabase, handleSupabaseError } from "../lib/supabase";
import { type Order } from "../types/order";
import { type OrderItem } from "../types/order-item";

/**
 * Create a new order with order items
 */
export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'order_number'>): Promise<Order | null> => {
    try {
        // Generate order number using the database function
        const { data: orderNumberData, error: orderNumberError } = await supabase
            .rpc('generate_order_number');

        if (orderNumberError) {
            handleSupabaseError(orderNumberError);
        }

        const orderNumber = orderNumberData;

        // Prepare order data
        const { items, ...orderDetails } = orderData;

        // Insert the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                ...orderDetails,
                order_number: orderNumber,
            }])
            .select()
            .single();

        if (orderError) {
            handleSupabaseError(orderError);
        }

        // Insert order items
        if (order && items && items.length > 0) {
            const orderItems = items.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                price: item.price,
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) {
                handleSupabaseError(itemsError);
            }
        }

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Get all orders (Admin only)
 */
export const getOrders = async (): Promise<Order[]> => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (*)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            handleSupabaseError(error);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error fetching order:', error);
        return null;
    }
};

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (
    id: string,
    orderStatus: string,
    paymentStatus?: string
): Promise<Order | null> => {
    try {
        const updates: any = { order_status: orderStatus };
        if (paymentStatus) {
            updates.payment_status = paymentStatus;
        }

        const { data, error } = await supabase
            .from('orders')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error updating order status:', error);
        return null;
    }
};

/**
 * Get orders by customer email
 */
export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (*)
            `)
            .eq('customer_email', email)
            .order('created_at', { ascending: false });

        if (error) {
            handleSupabaseError(error);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching orders by email:', error);
        return [];
    }
};