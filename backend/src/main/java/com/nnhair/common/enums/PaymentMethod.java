package com.nnhair.common.enums;

/**
 * Shared PaymentMethod enum used across Order and Payment entities.
 * Combines the properties from both previous versions.
 */
public enum PaymentMethod {
    CREDIT_CARD("Credit Card", "Visa/Mastercard"),
    DEBIT_CARD("Debit Card", "Bank debit card"),
    BANK_TRANSFER("Bank Transfer", "EFT/Bank transfer"),
    EFT("Electronic Funds Transfer", "Electronic Funds Transfer"),
    PAYPAL("PayPal", "PayPal payment"),
    PAYSTACK("PayStack", "PayStack payment gateway"),
    CASH_ON_DELIVERY("Cash on Delivery", "Pay when delivered");

    private final String displayName;
    private final String description;

    PaymentMethod(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}