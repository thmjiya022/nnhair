package com.nnhair.order.model;

import com.yahoo.elide.annotation.*;
import com.yahoo.elide.annotation.LifeCycleHookBinding.Operation;
import com.yahoo.elide.annotation.LifeCycleHookBinding.TransactionPhase;
import com.nnhair.common.model.BaseDomain;
import com.nnhair.common.validation.annotation.BaseDomainValidation;
import com.nnhair.order.hooks.CreateOrderHook;
import com.nnhair.order.hooks.UpdateOrderHook;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@XmlAccessorType(XmlAccessType.NONE)
@BaseDomainValidation
@Entity
@Table(name = "CUSTOMER_ORDER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(rootLevel = true, name = "order")
@LifeCycleHookBinding(operation = Operation.CREATE, hook = CreateOrderHook.class, phase = TransactionPhase.PRESECURITY)
@LifeCycleHookBinding(operation = Operation.UPDATE, hook = UpdateOrderHook.class, phase = TransactionPhase.PRECOMMIT)
public class Order extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "ORDER_NUMBER", unique = true, nullable = false, length = 50)
    private String orderNumber;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "CUSTOMER_EMAIL", nullable = false, length = 255)
    private String customerEmail;

    @Column(name = "CUSTOMER_PHONE", length = 20)
    private String customerPhone;

    @Column(name = "CUSTOMER_NAME", length = 255)
    private String customerName;

    @Embedded
    private ShippingAddress shippingAddress;

    @Column(name = "SUBTOTAL", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "SHIPPING_COST", nullable = false, precision = 10, scale = 2)
    private BigDecimal shippingCost;

    @Column(name = "TAX_AMOUNT", precision = 10, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "DISCOUNT_AMOUNT", precision = 10, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "TOTAL_AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "CURRENCY", length = 3)
    private String currency = "ZAR";

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 50)
    private OrderStatus status = OrderStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT_METHOD", length = 50)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT_STATUS", length = 50)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "NOTES", length = 1000)
    private String notes;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Exclude
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItem> items = new HashSet<>();

    @Exclude
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderStatusHistory> statusHistory = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (orderNumber == null) {
            orderNumber = generateOrderNumber();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @ComputedAttribute
    @Transient
    public boolean isPaid() {
        return paymentStatus == PaymentStatus.CAPTURED ||
                paymentStatus == PaymentStatus.AUTHORIZED;
    }

    @ComputedAttribute
    @Transient
    public boolean isShippable() {
        return isPaid() &&
                (status == OrderStatus.CONFIRMED ||
                        status == OrderStatus.PROCESSING);
    }

    @ComputedAttribute
    @Transient
    public int getTotalItems() {
        return items != null ? items.size() : 0;
    }

    @ComputedAttribute
    @Transient
    public int getItemCount() {
        if (items == null)
            return 0;
        return items.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }

    @ComputedAttribute
    @Transient
    public String getFormattedTotal() {
        if (totalAmount == null)
            return "R0.00";
        return "R" + totalAmount.setScale(2).toPlainString();
    }

    private String generateOrderNumber() {
        String timestamp = String.valueOf(System.currentTimeMillis() % 1000000);
        String random = String.valueOf((int) (Math.random() * 1000));
        return "NN-" + timestamp + "-" + random;
    }

    @Override
    @Transient
    public String toString() {
        return "{Order [id=" + id + ", orderNumber=" + orderNumber + "]}";
    }
}