package com.nnhair.wishlist.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "WISHLIST_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Owner OR Principal is Admin")
@Include(name = "wishlistItem")
public class WishlistItem extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "PRODUCT_ID", nullable = false)
    private Long productId;

    @Column(name = "PRODUCT_NAME", nullable = false, length = 255)
    private String productName;

    @Column(name = "PRODUCT_PRICE", precision = 10, scale = 2)
    private BigDecimal productPrice;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Column(name = "ADDED_AT")
    private LocalDateTime addedAt;

    @Column(name = "NOTES", length = 500)
    private String notes;

    @Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WISHLIST_ID", nullable = false)
    private Wishlist wishlist;

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }

    @ComputedAttribute
    @Transient
    public String getFormattedPrice() {
        if (productPrice == null)
            return "R0.00";
        return "R" + productPrice.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }
}