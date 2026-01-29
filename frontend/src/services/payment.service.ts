import { supabase } from "../lib/supabase";
import { type PaymentTransaction } from "../types/payment-transactions";

/**
 * South African Payment Gateway Integration
 * Supports: Yoco, PayFast, Ozow, EFT, Cash on Delivery
 */

// ============================================
// YOCO PAYMENT GATEWAY
// ============================================

export interface YocoPaymentRequest {
    orderId: string;
    amount: number; // in cents
    currency: string;
    successUrl: string;
    cancelUrl: string;
    failureUrl: string;
    metadata?: any;
}

export const createYocoPayment = async (request: YocoPaymentRequest) => {
    try {
        // In production, this would call your backend API which calls Yoco
        const response = await fetch('/api/payments/yoco/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Yoco payment creation error:', error);
        throw error;
    }
};

// ============================================
// PAYFAST PAYMENT GATEWAY
// ============================================

export interface PayFastPaymentRequest {
    merchant_id: string;
    merchant_key: string;
    amount: number;
    item_name: string;
    orderId: string;
    email_address: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
}

export const createPayFastPayment = (request: PayFastPaymentRequest): string => {
    // Build PayFast payment URL
    const isSandbox = import.meta.env.VITE_PAYFAST_SANDBOX === 'true';

    const baseUrl = isSandbox
        ? 'https://sandbox.payfast.co.za/eng/process'
        : 'https://www.payfast.co.za/eng/process';


    const params = new URLSearchParams({
        merchant_id: request.merchant_id,
        merchant_key: request.merchant_key,
        amount: request.amount.toFixed(2),
        item_name: request.item_name,
        m_payment_id: request.orderId,
        email_address: request.email_address,
        return_url: request.return_url,
        cancel_url: request.cancel_url,
        notify_url: request.notify_url,
    });

    return `${baseUrl}?${params.toString()}`;
};

// ============================================
// OZOW PAYMENT GATEWAY
// ============================================

export interface OzowPaymentRequest {
    orderId: string;
    amount: number;
    currency: string;
    customer: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
    cancelUrl: string;
    errorUrl: string;
    successUrl: string;
    notifyUrl: string;
}

export const createOzowPayment = async (request: OzowPaymentRequest) => {
    try {
        // In production, this would call your backend API which calls Ozow
        const response = await fetch('/api/payments/ozow/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ozow payment creation error:', error);
        throw error;
    }
};

// ============================================
// PAYMENT TRANSACTION MANAGEMENT
// ============================================

/**
 * Create a payment transaction record
 */
export const createPaymentTransaction = async (
    transaction: Omit<PaymentTransaction, 'id' | 'created_at' | 'updated_at'>
): Promise<PaymentTransaction | null> => {
    try {
        const { data, error } = await supabase
            .from('payment_transactions')
            .insert([transaction])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Create payment transaction error:', error);
        return null;
    }
};

/**
 * Update payment transaction status
 */
export const updatePaymentTransaction = async (
    transactionId: string,
    updates: Partial<PaymentTransaction>
): Promise<PaymentTransaction | null> => {
    try {
        const { data, error } = await supabase
            .from('payment_transactions')
            .update(updates)
            .eq('id', transactionId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Update payment transaction error:', error);
        return null;
    }
};

/**
 * Get payment transactions for an order
 */
export const getPaymentTransactionsByOrder = async (
    orderId: string
): Promise<PaymentTransaction[]> => {
    try {
        const { data, error } = await supabase
            .from('payment_transactions')
            .select('*')
            .eq('order_id', orderId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Get payment transactions error:', error);
        return [];
    }
};

// ============================================
// PAYMENT VERIFICATION
// ============================================

/**
 * Verify Yoco payment
 */
export const verifyYocoPayment = async (paymentId: string) => {
    try {
        const response = await fetch(`/api/payments/yoco/verify/${paymentId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Yoco verification error:', error);
        throw error;
    }
};

/**
 * Verify PayFast payment (called by PayFast IPN)
 */
export const verifyPayFastPayment = async (paymentData: any) => {
    try {
        const response = await fetch('/api/payments/payfast/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('PayFast verification error:', error);
        throw error;
    }
};

/**
 * Verify Ozow payment
 */
export const verifyOzowPayment = async (transactionId: string) => {
    try {
        const response = await fetch(`/api/payments/ozow/verify/${transactionId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ozow verification error:', error);
        throw error;
    }
};

// ============================================
// BANK TRANSFER (EFT) INSTRUCTIONS
// ============================================

export interface BankDetails {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branchCode: string;
    accountType: string;
    reference: string;
}

export const getBankTransferDetails = (orderNumber: string): BankDetails => {
    return {
        bankName: 'First National Bank (FNB)',
        accountHolder: 'NN Hair (Pty) Ltd',
        accountNumber: '62XXXXXXXX', // Replace with actual account number
        branchCode: '250655',
        accountType: 'Business Cheque Account',
        reference: orderNumber,
    };
};

// ============================================
// PAYMENT METHOD INFORMATION
// ============================================

export interface PaymentMethodInfo {
    id: string;
    name: string;
    description: string;
    logo: string;
    processingTime: string;
    fees: string;
    available: boolean;
}

export const getPaymentMethods = (): PaymentMethodInfo[] => {
    return [
        {
            id: 'yoco',
            name: 'Card Payment (Yoco)',
            description: 'Pay securely with your credit or debit card',
            logo: '/assets/payment-logos/yoco.png',
            processingTime: 'Instant',
            fees: 'No additional fees',
            available: true,
        },
        {
            id: 'payfast',
            name: 'PayFast',
            description: 'Instant EFT and card payments',
            logo: '/assets/payment-logos/payfast.png',
            processingTime: 'Instant',
            fees: 'No additional fees',
            available: true,
        },
        {
            id: 'ozow',
            name: 'Ozow',
            description: 'Fast and secure instant EFT payments',
            logo: '/assets/payment-logos/ozow.png',
            processingTime: 'Instant',
            fees: 'No additional fees',
            available: true,
        },
        {
            id: 'eft',
            name: 'Manual EFT / Bank Transfer',
            description: 'Transfer directly from your bank account',
            logo: '/assets/payment-logos/bank.png',
            processingTime: '1-2 business days',
            fees: 'Bank charges may apply',
            available: true,
        },
        {
            id: 'cash-on-delivery',
            name: 'Cash on Delivery',
            description: 'Pay when you receive your order',
            logo: '/assets/payment-logos/cash.png',
            processingTime: 'On delivery',
            fees: 'R50 COD fee',
            available: true,
        },
    ];
};

// ============================================
// REFUND PROCESSING
// ============================================

export const processRefund = async (
    orderId: string,
    amount: number,
    reason: string
) => {
    try {
        // Get the original payment transaction
        const transactions = await getPaymentTransactionsByOrder(orderId);
        const originalTransaction = transactions.find(t => t.status === 'completed');

        if (!originalTransaction) {
            throw new Error('No completed payment transaction found');
        }

        // Process refund based on payment method
        let refundResult;
        switch (originalTransaction.payment_gateway) {
            case 'yoco':
                refundResult = await fetch('/api/payments/yoco/refund', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transactionId: originalTransaction.transaction_id,
                        amount,
                        reason,
                    }),
                });
                break;

            case 'payfast':
                // PayFast refunds are processed manually
                refundResult = { success: true, manual: true };
                break;

            case 'ozow':
                refundResult = await fetch('/api/payments/ozow/refund', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transactionId: originalTransaction.transaction_id,
                        amount,
                        reason,
                    }),
                });
                break;

            default:
                throw new Error('Unsupported payment gateway for refunds');
        }

        // Create refund transaction record
        await createPaymentTransaction({
            order_id: orderId,
            payment_method: originalTransaction.payment_method,
            payment_gateway: originalTransaction.payment_gateway,
            amount: -amount, // Negative amount for refund
            status: 'completed',
            gateway_response: refundResult,
        });

        return refundResult;
    } catch (error) {
        console.error('Refund processing error:', error);
        throw error;
    }
};