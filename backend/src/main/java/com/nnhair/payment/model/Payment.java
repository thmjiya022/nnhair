package com.nnhair.payment.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.nnhair.common.enums.PaymentMethod;
import com.nnhair.common.enums.PaymentStatus;

@Entity
@Table(name = "PAYMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Admin")
@Include(rootLevel = true, name = "payment")
public class Payment extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "ORDER_ID", nullable = false)
    private String orderId;

    @Column(name = "ORDER_NUMBER", nullable = false, length = 50)
    private String orderNumber;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "CURRENCY", length = 3)
    private String currency = "ZAR";

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT_METHOD", nullable = false, length = 50)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT_STATUS", nullable = false, length = 50)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "TRANSACTION_ID", length = 100)
    private String transactionId;

    @Column(name = "PAYMENT_GATEWAY", length = 50)
    private String paymentGateway;

    @Column(name = "GATEWAY_RESPONSE", columnDefinition = "TEXT")
    private String gatewayResponse;

    @Column(name = "FAILURE_REASON", length = 500)
    private String failureReason;

    @Column(name = "PAID_AT")
    private LocalDateTime paidAt;

    @Column(name = "REFUNDED_AT")
    private LocalDateTime refundedAt;

    @Column(name = "REFUND_AMOUNT", precision = 10, scale = 2)
    private BigDecimal refundAmount = BigDecimal.ZERO;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (transactionId == null) {
            transactionId = generateTransactionId();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (paymentStatus == PaymentStatus.CAPTURED && paidAt == null) {
            paidAt = LocalDateTime.now();
        }
        if (paymentStatus == PaymentStatus.REFUNDED && refundedAt == null) {
            refundedAt = LocalDateTime.now();
        }
    }

    @ComputedAttribute
    @Transient
    public boolean isSuccessful() {
        return paymentStatus == PaymentStatus.CAPTURED ||
                paymentStatus == PaymentStatus.AUTHORIZED;
    }

    @ComputedAttribute
    @Transient
    public boolean isRefundable() {
        return isSuccessful() &&
                refundAmount != null &&
                refundAmount.compareTo(amount) < 0;
    }

    private String generateTransactionId() {
        return "TXN-" + System.currentTimeMillis() + "-" +
                (int) (Math.random() * 1000);
    }
}