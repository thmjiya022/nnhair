package com.nnhair.order.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseUpdateHook;
import com.nnhair.order.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
public class UpdateOrderHook extends BaseUpdateHook<Order> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Order order,
            RequestScope requestScope) {

        log.info("Updating order: {}", order.getId());

        String currentUser = getCurrentUserId(requestScope);

        // Track status changes
        OrderStatus newStatus = order.getStatus();
        if (newStatus != null) {
            OrderStatusHistory history = OrderStatusHistory.builder()
                    .order(order)
                    .status(newStatus)
                    .notes("Status updated by " + currentUser)
                    .createdBy(currentUser)
                    .createdAt(LocalDateTime.now())
                    .build();

            if (order.getStatusHistory() == null) {
                order.setStatusHistory(new HashSet<>());
            }
            order.getStatusHistory().add(history);

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
                        .notes("Payment confirmed, order confirmed")
                        .createdBy(currentUser)
                        .createdAt(LocalDateTime.now())
                        .build();
                order.getStatusHistory().add(paymentHistory);
            }
        }

        // Update audit fields
        order.setUpdatedBy(currentUser);
        order.setUpdatedDate(LocalDateTime.now());
    }
}