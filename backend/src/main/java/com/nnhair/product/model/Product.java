package com.nnhair.product.model;

import com.nnhair.product.hooks.CreateProductHook;
import com.nnhair.product.hooks.UpdateProductHook;
import com.nnhair.product.hooks.SoftDeleteProductHook;
import com.yahoo.elide.annotation.*;
import com.yahoo.elide.annotation.LifeCycleHookBinding.Operation;
import com.yahoo.elide.annotation.LifeCycleHookBinding.TransactionPhase;
import com.nnhair.common.model.BaseDomainWithAutoIncrement;
import com.nnhair.common.validation.annotation.*;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@XmlAccessorType(XmlAccessType.NONE)
@BaseDomainValidation
@Entity
@Table(name = "PRODUCT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Admin")
@ReadPermission(expression = "Principal is Authenticated")
@UpdatePermission(expression = "Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(rootLevel = true, name = "product")
@LifeCycleHookBinding(operation = Operation.CREATE, hook = CreateProductHook.class, phase = TransactionPhase.PRESECURITY)
@LifeCycleHookBinding(operation = Operation.UPDATE, hook = UpdateProductHook.class, phase = TransactionPhase.PRECOMMIT)
@LifeCycleHookBinding(operation = Operation.DELETE, hook = SoftDeleteProductHook.class, phase = TransactionPhase.PRESECURITY)
public class Product extends BaseDomainWithAutoIncrement {

    private static final long serialVersionUID = 1L;

    @NotBlankAndRange(fieldName = "Product Name", min = 1, max = 255)
    @XmlAttribute(name = "name", required = true)
    @Column(name = "PRODUCT_NAME", nullable = false, length = 255)
    private String name;

    @XmlElement(name = "description")
    @Column(name = "DESCRIPTION", columnDefinition = "TEXT")
    private String description;

    @XmlAttribute(name = "price", required = true)
    @Column(name = "PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @XmlAttribute(name = "originalPrice")
    @Column(name = "ORIGINAL_PRICE", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @XmlAttribute(name = "category", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY", nullable = false, length = 50)
    private ProductCategory category;

    @XmlAttribute(name = "texture", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "TEXTURE", nullable = false, length = 50)
    private HairTexture texture;

    @XmlAttribute(name = "stockQuantity", required = true)
    @Column(name = "STOCK_QUANTITY", nullable = false)
    private Integer stockQuantity;

    @XmlAttribute(name = "sku")
    @Column(name = "SKU", unique = true, length = 100)
    private String sku;

    @XmlElementWrapper(name = "images")
    @XmlElement(name = "image")
    @ElementCollection
    @CollectionTable(name = "PRODUCT_IMAGE", joinColumns = @JoinColumn(name = "PRODUCT_ID"))
    @Column(name = "IMAGE_URL")
    private List<String> imageUrls = new ArrayList<>();

    @XmlAttribute(name = "isFeatured")
    @Column(name = "IS_FEATURED")
    private Boolean isFeatured = false;

    @XmlAttribute(name = "isActive")
    @Column(name = "IS_ACTIVE")
    private Boolean isActive = true;

    @XmlAttribute(name = "createdAt")
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @XmlAttribute(name = "updatedAt")
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Exclude
    @XmlTransient
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
    private Set<ProductVariant> variants = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (sku == null) {
            sku = generateSku();
        }
        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "discountedPrice")
    public BigDecimal getDiscountedPrice() {
        if (originalPrice != null && originalPrice.compareTo(price) > 0) {
            return originalPrice.subtract(price);
        }
        return BigDecimal.ZERO;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "discountPercentage")
    public Integer getDiscountPercentage() {
        if (originalPrice != null && originalPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = originalPrice.subtract(price);
            return discount.divide(originalPrice, 2, BigDecimal.ROUND_HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .intValue();
        }
        return 0;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "inStock")
    public boolean isInStock() {
        return stockQuantity != null && stockQuantity > 0;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "totalVariants")
    public int getTotalVariants() {
        return variants != null ? variants.size() : 0;
    }

    private String generateSku() {
        String prefix = "NNH";
        String categoryCode = category != null ? category.name().substring(0, 3) : "WIG";
        String textureCode = texture != null ? texture.name().substring(0, 2) : "ST";
        String timestamp = String.valueOf(System.currentTimeMillis() % 10000);
        return String.format("%s-%s-%s-%s", prefix, categoryCode, textureCode, timestamp);
    }

    @Override
    @Transient
    @XmlTransient
    public String toString() {
        return "{Product [id=" + id + ", name=" + name + ", sku=" + sku + "]}";
    }
}