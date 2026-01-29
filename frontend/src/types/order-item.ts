export interface OrderItem {
    id?: string; 
    order_id?: string; 
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
    created_at?: string;
}