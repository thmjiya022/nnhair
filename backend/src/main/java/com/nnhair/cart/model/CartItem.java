package com.nnhair.cart.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "CART_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Owner OR Principal is Admin")
@Include(name = "cartItem")
public class CartItem extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "PRODUCT_ID", nullable = false)
    private Long productId;

    @Column(name = "VARIANT_ID")
    private String variantId;

    @Column(name = "PRODUCT_NAME", nullable = false, length = 255)
    private String productName;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity = 1;

    @Column(name = "UNIT_PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CART_ID", nullable = false)
    private Cart cart;

    @PrePersist
    @PreUpdate
    public void validateQuantity() {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
    }

    @ComputedAttribute
    @Transient
    public BigDecimal getItemTotal() {
        if (unitPrice == null || quantity == null) {
            return BigDecimal.ZERO;
        }
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    @ComputedAttribute
    @Transient
    public String getFormattedTotal() {
        return "R" + getItemTotal().setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }
}