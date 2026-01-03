package com.nnhair.cart.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "CART")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Owner OR Principal is Admin")
@Include(rootLevel = true, name = "cart")
public class Cart extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "SESSION_ID", length = 100)
    private String sessionId;

    @Column(name = "SUBTOTAL", precision = 10, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(name = "DISCOUNT_AMOUNT", precision = 10, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "TOTAL_AMOUNT", precision = 10, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "ITEM_COUNT")
    private Integer itemCount = 0;

    @Column(name = "IS_ACTIVE")
    private Boolean isActive = true;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Column(name = "EXPIRES_AT")
    private LocalDateTime expiresAt;

    @Exclude
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<CartItem> items = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        expiresAt = LocalDateTime.now().plusDays(30);
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateTotals();
    }

    @ComputedAttribute
    @Transient
    public void calculateTotals() {
        if (items == null) {
            items = new HashSet<>();
        }

        subtotal = items.stream()
                .map(CartItem::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        totalAmount = subtotal.subtract(discountAmount != null ? discountAmount : BigDecimal.ZERO);
        itemCount = items.size();
    }

    @ComputedAttribute
    @Transient
    public boolean isEmpty() {
        return items == null || items.isEmpty();
    }

    @ComputedAttribute
    @Transient
    public boolean isExpired() {
        return expiresAt != null && expiresAt.isBefore(LocalDateTime.now());
    }

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
        calculateTotals();
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
        calculateTotals();
    }

    public void clearCart() {
        items.clear();
        calculateTotals();
    }
}