package com.nnhair.order.model;

public enum OrderStatus {
    PENDING("Pending", "Order received, awaiting payment"),
    PROCESSING("Processing", "Payment received, order being processed"),
    CONFIRMED("Confirmed", "Order confirmed and ready for preparation"),
    PREPARING("Preparing", "Items being prepared for shipping"),
    READY_FOR_SHIPPING("Ready for Shipping", "Order packed and ready to ship"),
    SHIPPED("Shipped", "Order has been shipped"),
    IN_TRANSIT("In Transit", "Order is on the way"),
    OUT_FOR_DELIVERY("Out for Delivery", "Order out for delivery today"),
    DELIVERED("Delivered", "Order successfully delivered"),
    CANCELLED("Cancelled", "Order cancelled"),
    REFUNDED("Refunded", "Order refunded"),
    FAILED("Failed", "Order failed");

    private final String displayName;
    private final String description;

    OrderStatus(String displayName, String description) {
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