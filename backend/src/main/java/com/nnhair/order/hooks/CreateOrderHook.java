package com.nnhair.order.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.lifecycle.LifeCycleHook;
import com.yahoo.elide.core.security.ChangeSpec;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.order.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;

@Slf4j
@Component
public class CreateOrderHook implements LifeCycleHook<Order> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Order order,
            RequestScope requestScope,
            Optional<ChangeSpec> changes) {

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
                .map(item -> {
                    // Ensure item total is calculated
                    if (item.getTotalPrice() == null) {
                        item.calculateTotal();
                    }
                    return item.getTotalPrice();
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setSubtotal(subtotal);

        // Set default shipping cost if not provided
        if (order.getShippingCost() == null || order.getShippingCost().compareTo(BigDecimal.ZERO) == 0) {
            order.setShippingCost(new BigDecimal("150.00"));
        }

        // Calculate tax (South Africa VAT 15%)
        if (order.getTaxAmount() == null || order.getTaxAmount().compareTo(BigDecimal.ZERO) == 0) {
            order.setTaxAmount(subtotal.multiply(new BigDecimal("0.15")));
        }

        // Ensure discount amount is set
        if (order.getDiscountAmount() == null) {
            order.setDiscountAmount(BigDecimal.ZERO);
        }

        // Calculate total
        BigDecimal total = subtotal
                .add(order.getShippingCost())
                .add(order.getTaxAmount())
                .subtract(order.getDiscountAmount());
        order.setTotalAmount(total);

        // Set default currency
        if (order.getCurrency() == null || order.getCurrency().isEmpty()) {
            order.setCurrency("ZAR");
        }

        // Set default statuses
        if (order.getStatus() == null) {
            order.setStatus(OrderStatus.PENDING);
        }
        if (order.getPaymentStatus() == null) {
            order.setPaymentStatus(PaymentStatus.PENDING);
        }

        // Create initial status history
        String currentUser = getCurrentUserId(requestScope);
        OrderStatusHistory initialHistory = OrderStatusHistory.builder()
                .order(order)
                .status(order.getStatus())
                .notes("Order created")
                .createdBy(currentUser)
                .build();

        if (order.getStatusHistory() == null) {
            order.setStatusHistory(new HashSet<>());
        }
        order.addStatusHistory(initialHistory);

        // Link items to order
        order.getItems().forEach(item -> item.setOrder(order));

        // Set audit fields
        order.setCreatedBy(currentUser);
        order.setCreatedDate(LocalDateTime.now());

        log.info("Order created: {}, Total: R{}",
                order.getOrderNumber(), order.getTotalAmount());
    }

    private String getCurrentUserId(RequestScope requestScope) {
        if (requestScope.getUser() != null && requestScope.getUser().getPrincipal() != null) {
            return requestScope.getUser().getPrincipal().toString();
        }
        return "SYSTEM";
    }
}