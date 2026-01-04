package com.nnhair.order.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.lifecycle.LifeCycleHook;
import com.yahoo.elide.core.security.ChangeSpec;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.order.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import com.nnhair.common.enums.PaymentStatus;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;

@Slf4j
@Component
public class UpdateOrderHook implements LifeCycleHook<Order> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Order order,
            RequestScope requestScope,
            Optional<ChangeSpec> changes) {

        log.info("Updating order: {}", order.getId());

        String currentUser = getCurrentUserId(requestScope);

        // Initialize status history if needed
        if (order.getStatusHistory() == null) {
            order.setStatusHistory(new HashSet<>());
        }

        // Track status changes
        OrderStatus newStatus = order.getStatus();
        if (newStatus != null) {
            OrderStatusHistory history = OrderStatusHistory.builder()
                    .order(order)
                    .status(newStatus)
                    .notes("Status updated to " + newStatus.getDisplayName())
                    .createdBy(currentUser)
                    .build();

            order.addStatusHistory(history);

            log.info("Order {} status changed to {}", order.getOrderNumber(), newStatus);
        }

        // Track payment status changes
        if (order.getPaymentStatus() == PaymentStatus.CAPTURED) {
            log.info("Payment captured for order: {}", order.getOrderNumber());

            // Auto-update order status if payment successful
            if (order.getStatus() == OrderStatus.PENDING) {
                order.setStatus(OrderStatus.CONFIRMED);

                OrderStatusHistory paymentHistory = OrderStatusHistory.builder()
                        .order(order)
                        .status(OrderStatus.CONFIRMED)
                        .notes("Payment confirmed, order auto-confirmed")
                        .createdBy(currentUser)
                        .build();
                order.addStatusHistory(paymentHistory);
            }
        }

        // Handle refunds
        if (order.getPaymentStatus() == PaymentStatus.REFUNDED) {
            log.info("Refund processed for order: {}", order.getOrderNumber());

            // Auto-update order status on refund
            if (order.getStatus() != OrderStatus.REFUNDED) {
                order.setStatus(OrderStatus.REFUNDED);

                OrderStatusHistory refundHistory = OrderStatusHistory.builder()
                        .order(order)
                        .status(OrderStatus.REFUNDED)
                        .notes("Order refunded")
                        .createdBy(currentUser)
                        .build();
                order.addStatusHistory(refundHistory);
            }
        }

        // Update audit fields
        order.setUpdatedBy(currentUser);
        order.setUpdatedDate(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
    }

    private String getCurrentUserId(RequestScope requestScope) {
        if (requestScope.getUser() != null && requestScope.getUser().getPrincipal() != null) {
            return requestScope.getUser().getPrincipal().toString();
        }
        return "SYSTEM";
    }
}