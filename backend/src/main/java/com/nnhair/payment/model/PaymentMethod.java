// src/main/java/com/nnhair/payment/model/PaymentMethod.java
package com.nnhair.payment.model;

public enum PaymentMethod {
    CREDIT_CARD("Credit Card"),
    DEBIT_CARD("Debit Card"),
    BANK_TRANSFER("Bank Transfer"),
    EFT("Electronic Funds Transfer"),
    PAYPAL("PayPal"),
    PAYSTACK("PayStack"),
    CASH_ON_DELIVERY("Cash on Delivery");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}