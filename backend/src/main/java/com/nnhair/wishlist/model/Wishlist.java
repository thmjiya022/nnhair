package com.nnhair.wishlist.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "WISHLIST")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Owner OR Principal is Admin")
@Include(rootLevel = true, name = "wishlist")
public class Wishlist extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "NAME", length = 100)
    private String name = "My Wishlist";

    @Column(name = "IS_PRIVATE")
    private Boolean isPrivate = true;

    @Column(name = "ITEM_COUNT")
    private Integer itemCount = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Exclude
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "wishlist", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<WishlistItem> items = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        itemCount = items != null ? items.size() : 0;
    }

    @ComputedAttribute
    @Transient
    public boolean isEmpty() {
        return items == null || items.isEmpty();
    }

    public void addItem(WishlistItem item) {
        items.add(item);
        item.setWishlist(this);
        itemCount = items.size();
    }

    public void removeItem(WishlistItem item) {
        items.remove(item);
        item.setWishlist(null);
        itemCount = items.size();
    }

    public void clear() {
        items.clear();
        itemCount = 0;
    }
}