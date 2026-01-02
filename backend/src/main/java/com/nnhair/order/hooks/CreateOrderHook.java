package com.nnhair.order.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseCreateHook;
import com.nnhair.order.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
public class CreateOrderHook extends BaseCreateHook<Order> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Order order,
            RequestScope requestScope) {

        log.info("Creating order for user: {}", order.getUserId());

        // Validate order items
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have at least one item");
        }

        // Validate shipping address
        if (order.getShippingAddress() == null || !order.getShippingAddress().isComplete()) {
            throw new IllegalArgumentException("Complete shipping address is required");
        }

        // Calculate subtotal from items
        BigDecimal subtotal = order.getItems().stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setSubtotal(subtotal);

        // Set default shipping cost (R150 as per your screenshot)
        if (order.getShippingCost() == null) {
            order.setShippingCost(BigDecimal.valueOf(150.00));
        }

        // Calculate tax (South Africa VAT 15%)
        if (order.getTaxAmount() == null) {
            order.setTaxAmount(subtotal.multiply(BigDecimal.valueOf(0.15)));
        }

        // Calculate total
        BigDecimal total = subtotal
                .add(order.getShippingCost())
                .add(order.getTaxAmount())
                .subtract(order.getDiscountAmount() != null ? order.getDiscountAmount() : BigDecimal.ZERO);
        order.setTotalAmount(total);

        // Set default currency
        if (order.getCurrency() == null) {
            order.setCurrency("ZAR");
        }

        // Create initial status history
        OrderStatusHistory initialHistory = OrderStatusHistory.builder()
                .order(order)
                .status(OrderStatus.PENDING)
                .notes("Order created")
                .createdBy(getCurrentUserId(requestScope))
                .build();

        if (order.getStatusHistory() == null) {
            order.setStatusHistory(new HashSet<>());
        }
        order.getStatusHistory().add(initialHistory);

        // Set audit fields
        order.setCreatedBy(getCurrentUserId(requestScope));
        order.setCreatedDate(java.time.LocalDateTime.now());

        log.info("Order created: {}, Total: R{}",
                order.getOrderNumber(), order.getTotalAmount());
    }
}