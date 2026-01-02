package com.nnhair.order.model;

public enum PaymentMethod {
    CREDIT_CARD("Credit Card", "Visa/Mastercard"),
    DEBIT_CARD("Debit Card", "Bank debit card"),
    BANK_TRANSFER("Bank Transfer", "EFT/Bank transfer"),
    CASH_ON_DELIVERY("Cash on Delivery", "Pay when delivered"),
    PAYPAL("PayPal", "PayPal payment"),
    PAYSTACK("PayStack", "PayStack payment gateway");

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