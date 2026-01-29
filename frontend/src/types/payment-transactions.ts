export interface PaymentTransaction {
    id?: string;
    order_id: string;
    payment_method: string;
    payment_gateway?: string;
    transaction_id?: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    gateway_response?: any;
    created_at?: string;
    updated_at?: string;
}