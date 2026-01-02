// src/main/java/com/nnhair/product/model/ProductVariant.java
package com.nnhair.product.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import com.nnhair.common.validation.annotation.*;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.math.BigDecimal;

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
    private String variantType; // LENGTH, COLOR, DENSITY

    @XmlAttribute(name = "value")
    @Column(name = "VARIANT_VALUE", length = 100)
    private String variantValue;

    @XmlAttribute(name = "additionalPrice")
    @Column(name = "ADDITIONAL_PRICE", precision = 10, scale = 2)
    private BigDecimal additionalPrice = BigDecimal.ZERO;

    @XmlAttribute(name = "stockQuantity")
    @Column(name = "STOCK_QUANTITY")
    private Integer stockQuantity = 0;

    @XmlAttribute(name = "skuSuffix")
    @Column(name = "SKU_SUFFIX", length = 50)
    private String skuSuffix;

    @Exclude
    @XmlTransient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Product product;

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "totalPrice")
    public BigDecimal getTotalPrice() {
        if (product != null && product.getPrice() != null) {
            return product.getPrice().add(additionalPrice != null ? additionalPrice : BigDecimal.ZERO);
        }
        return additionalPrice != null ? additionalPrice : BigDecimal.ZERO;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "fullSku")
    public String getFullSku() {
        if (product != null && product.getSku() != null && skuSuffix != null) {
            return product.getSku() + "-" + skuSuffix;
        }
        return skuSuffix;
    }
}