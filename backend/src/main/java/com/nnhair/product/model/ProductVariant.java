// src/main/java/com/nnhair/product/model/ProductVariant.java
package com.nnhair.product.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import com.nnhair.common.validation.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

@XmlAccessorType(XmlAccessType.NONE)
@BaseDomainValidation
@Entity
@Table(name = "PRODUCT_VARIANT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Admin")
@ReadPermission(expression = "Principal is Authenticated")
@UpdatePermission(expression = "Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(name = "variant")
public class ProductVariant extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @NotBlankAndRange(fieldName = "Variant Name", min = 1, max = 100)
    @XmlAttribute(name = "name", required = true)
    @Column(name = "VARIANT_NAME", nullable = false, length = 100)
    private String variantName;

    @XmlAttribute(name = "type")
    @Column(name = "VARIANT_TYPE", length = 50)
    private String variantType; // LENGTH, COLOR, DENSITY, SIZE

    @XmlAttribute(name = "value")
    @Column(name = "VARIANT_VALUE", length = 100)
    private String variantValue;

    @XmlAttribute(name = "additionalPrice")
    @Column(name = "ADDITIONAL_PRICE", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal additionalPrice = BigDecimal.ZERO;

    @PositiveOrZero(message = "Stock quantity cannot be negative")
    @XmlAttribute(name = "stockQuantity")
    @Column(name = "STOCK_QUANTITY")
    @Builder.Default
    private Integer stockQuantity = 0;

    @XmlAttribute(name = "skuSuffix")
    @Column(name = "SKU_SUFFIX", length = 50)
    private String skuSuffix;

    @XmlAttribute(name = "barcode")
    @Column(name = "BARCODE", length = 100)
    private String barcode;

    @XmlAttribute(name = "isActive")
    @Column(name = "IS_ACTIVE")
    @Builder.Default
    private Boolean isActive = true;

    @Exclude
    @XmlTransient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Product product;

    @PrePersist
    protected void onCreate() {
        if (stockQuantity == null) {
            stockQuantity = 0;
        }
        if (additionalPrice == null) {
            additionalPrice = BigDecimal.ZERO;
        }
        if (isActive == null) {
            isActive = true;
        }

        // Generate SKU suffix if not provided
        if (skuSuffix == null && variantValue != null) {
            skuSuffix = variantValue.toUpperCase().replaceAll("[^A-Z0-9]", "").substring(0,
                    Math.min(3, variantValue.length()));
        }
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "totalPrice")
    public BigDecimal getTotalPrice() {
        if (product != null && product.getPrice() != null) {
            BigDecimal basePrice = product.getPrice();
            BigDecimal addPrice = additionalPrice != null ? additionalPrice : BigDecimal.ZERO;
            return basePrice.add(addPrice);
        }
        return additionalPrice != null ? additionalPrice : BigDecimal.ZERO;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "fullSku")
    public String getFullSku() {
        if (product != null && product.getSku() != null) {
            if (skuSuffix != null && !skuSuffix.trim().isEmpty()) {
                return product.getSku() + "-" + skuSuffix;
            }
            return product.getSku();
        }
        return skuSuffix;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "formattedTotalPrice")
    public String getFormattedTotalPrice() {
        return "R" + getTotalPrice().setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "formattedAdditionalPrice")
    public String getFormattedAdditionalPrice() {
        if (additionalPrice == null || additionalPrice.compareTo(BigDecimal.ZERO) == 0) {
            return "";
        }
        return "R" + additionalPrice.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "inStock")
    public boolean isInStock() {
        return stockQuantity != null && stockQuantity > 0;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "displayName")
    public String getDisplayName() {
        if (variantType != null && variantValue != null) {
            return variantType + ": " + variantValue;
        }
        return variantName;
    }

    @Override
    public String toString() {
        return String.format("ProductVariant{id='%s', name='%s', type='%s', value='%s'}",
                id, variantName, variantType, variantValue);
    }
}