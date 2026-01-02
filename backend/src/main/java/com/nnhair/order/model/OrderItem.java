package com.nnhair.order.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ORDER_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(name = "orderItem")
public class OrderItem extends BaseDomain {

    @Column(name = "PRODUCT_ID", nullable = false, length = 36)
    private String productId;

    @Column(name = "PRODUCT_NAME", nullable = false, length = 255)
    private String productName;

    @Column(name = "PRODUCT_SKU", length = 100)
    private String productSku;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @Column(name = "UNIT_PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "TOTAL_PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "VARIANT_ID", length = 36)
    private String variantId;

    @Column(name = "VARIANT_DETAILS", length = 500)
    private String variantDetails;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID", nullable = false)
    private Order order;

    @PrePersist
    public void calculateTotal() {
        if (unitPrice != null && quantity != null) {
            totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }

    @ComputedAttribute
    @Transient
    public String getFormattedTotal() {
        if (totalPrice == null)
            return "R0.00";
        return "R" + totalPrice.setScale(2).toPlainString();
    }

    @ComputedAttribute
    @Transient
    public String getFormattedUnitPrice() {
        if (unitPrice == null)
            return "R0.00";
        return "R" + unitPrice.setScale(2).toPlainString();
    }
}