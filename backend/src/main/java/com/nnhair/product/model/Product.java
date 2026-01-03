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
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
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

    @NotNull(message = "Price is required")
    @XmlAttribute(name = "price", required = true)
    @Column(name = "PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @XmlAttribute(name = "originalPrice")
    @Column(name = "ORIGINAL_PRICE", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @NotNull(message = "Category is required")
    @XmlAttribute(name = "category", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY", nullable = false, length = 50)
    private ProductCategory category;

    @NotNull(message = "Texture is required")
    @XmlAttribute(name = "texture", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "TEXTURE", nullable = false, length = 50)
    private HairTexture texture;

    @NotNull(message = "Stock quantity is required")
    @PositiveOrZero(message = "Stock quantity cannot be negative")
    @XmlAttribute(name = "stockQuantity", required = true)
    @Column(name = "STOCK_QUANTITY", nullable = false)
    private Integer stockQuantity;

    @XmlAttribute(name = "sku")
    @Column(name = "SKU", unique = true, length = 100)
    private String sku;

    @XmlAttribute(name = "weight")
    @Column(name = "WEIGHT", precision = 6, scale = 2)
    private BigDecimal weight;

    @XmlAttribute(name = "length")
    @Column(name = "LENGTH", precision = 6, scale = 2)
    private BigDecimal length;

    @XmlAttribute(name = "material")
    @Column(name = "MATERIAL", length = 100)
    private String material;

    @XmlElementWrapper(name = "images")
    @XmlElement(name = "image")
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "PRODUCT_IMAGE", joinColumns = @JoinColumn(name = "PRODUCT_ID"))
    @Column(name = "IMAGE_URL", nullable = false, length = 500)
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();

    @XmlAttribute(name = "isFeatured")
    @Column(name = "IS_FEATURED")
    @Builder.Default
    private Boolean isFeatured = false;

    @XmlAttribute(name = "isActive")
    @Column(name = "IS_ACTIVE")
    @Builder.Default
    private Boolean isActive = true;

    @XmlAttribute(name = "createdAt")
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @XmlAttribute(name = "updatedAt")
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Exclude
    @XmlTransient
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ProductVariant> variants = new HashSet<>();

    @Exclude
    @XmlTransient
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @Builder.Default
    private Set<com.nnhair.order.model.OrderItem> orderItems = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (sku == null || sku.trim().isEmpty()) {
            sku = generateSku();
        }
        if (isActive == null) isActive = true;
        if (isFeatured == null) isFeatured = false;
        if (stockQuantity == null) stockQuantity = 0;
        if (price == null) price = BigDecimal.ZERO;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "discountedPrice")
    public BigDecimal getDiscountedPrice() {
        if (originalPrice != null && originalPrice.compareTo(BigDecimal.ZERO) > 0
                && price != null && originalPrice.compareTo(price) > 0) {
            return originalPrice.subtract(price);
        }
        return BigDecimal.ZERO;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "discountPercentage")
    public Integer getDiscountPercentage() {
        if (originalPrice != null && originalPrice.compareTo(BigDecimal.ZERO) > 0
                && price != null && originalPrice.compareTo(price) > 0) {
            BigDecimal discount = originalPrice.subtract(price);
            return discount.divide(originalPrice, 4, RoundingMode.HALF_UP)
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

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "mainImage")
    public String getMainImage() {
        if (imageUrls != null && !imageUrls.isEmpty()) {
            return imageUrls.get(0);
        }
        return "/images/default-product.jpg";
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "isOnSale")
    public boolean isOnSale() {
        return getDiscountPercentage() > 0;
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "formattedPrice")
    public String getFormattedPrice() {
        if (price == null) return "R0.00";
        return "R" + price.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "formattedOriginalPrice")
    public String getFormattedOriginalPrice() {
        if (originalPrice == null || originalPrice.compareTo(BigDecimal.ZERO) == 0) return "";
        return "R" + originalPrice.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    @ComputedAttribute
    @Transient
    @XmlAttribute(name = "availableStock")
    public Integer getAvailableStock() {
        if (stockQuantity == null) return 0;
        int reservedStock = 0;
        if (variants != null) {
            reservedStock = variants.stream()
                    .filter(v -> v.getStockQuantity() != null)
                    .mapToInt(ProductVariant::getStockQuantity)
                    .sum();
        }
        return Math.max(0, stockQuantity - reservedStock);
    }

    private String generateSku() {
        String prefix = "NNH";
        String categoryCode = category != null
                ? (category.name().length() >= 3 ? category.name().substring(0, 3) : category.name())
                : "WIG";
        String textureCode = texture != null
                ? (texture.name().length() >= 2 ? texture.name().substring(0, 2) : texture.name())
                : "ST";
        String timestamp = String.valueOf(System.currentTimeMillis() % 10000);
        return String.format("%s-%s-%s-%04d", prefix, categoryCode, textureCode, Integer.parseInt(timestamp));
    }

    public void addImageUrl(String imageUrl) {
        if (imageUrls == null) imageUrls = new ArrayList<>();
        imageUrls.add(imageUrl);
    }

    public void removeImageUrl(String imageUrl) {
        if (imageUrls != null) imageUrls.remove(imageUrl);
    }

    public void addVariant(ProductVariant variant) {
        if (variants == null) variants = new HashSet<>();
        variant.setProduct(this);
        variants.add(variant);
    }

    public void removeVariant(ProductVariant variant) {
        if (variants != null) {
            variant.setProduct(null);
            variants.remove(variant);
        }
    }

    public boolean hasVariant(String variantId) {
        return variants != null && variants.stream()
                .anyMatch(v -> v.getId() != null && v.getId().equals(variantId));
    }

    @Override
    @Transient
    @XmlTransient
    public String toString() {
        return String.format("Product{id=%d, name='%s', sku='%s', price=%s}", id, name, sku, price);
    }
}
