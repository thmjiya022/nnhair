import { type OrderItem } from "./order-item";

export interface Order {
    id?: string;
    order_number?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    city: string;
    postal_code: string;
    payment_method: string;
    notes?: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    payment_status: string;
    order_status: string;
    created_at?: string;
    updated_at?: string;
}