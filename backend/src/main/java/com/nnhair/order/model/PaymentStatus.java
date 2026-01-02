package com.nnhair.order.model;

public enum PaymentStatus {
    PENDING("Pending", "Awaiting payment"),
    AUTHORIZED("Authorized", "Payment authorized but not captured"),
    CAPTURED("Captured", "Payment successfully captured"),
    PARTIALLY_REFUNDED("Partially Refunded", "Partial refund issued"),
    REFUNDED("Refunded", "Full refund issued"),
    FAILED("Failed", "Payment failed"),
    CANCELLED("Cancelled", "Payment cancelled");

    private final String displayName;
    private final String description;

    PaymentStatus(String displayName, String description) {
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