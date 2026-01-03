// src/main/java/com/nnhair/payment/model/PaymentStatus.java
package com.nnhair.payment.model;

public enum PaymentStatus {
    PENDING("Pending"),
    AUTHORIZED("Authorized"),
    CAPTURED("Captured"),
    PARTIALLY_CAPTURED("Partially Captured"),
    FAILED("Failed"),
    CANCELLED("Cancelled"),
    REFUNDED("Refunded"),
    PARTIALLY_REFUNDED("Partially Refunded"),
    DISPUTED("Disputed");

    private final String displayName;

    PaymentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}