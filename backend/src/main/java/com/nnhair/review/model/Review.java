package com.nnhair.review.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "REVIEW")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Authenticated")
@ReadPermission(expression = "Principal is Authenticated")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Owner OR Principal is Admin")
@Include(rootLevel = true, name = "review")
public class Review extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "PRODUCT_ID", nullable = false)
    private Long productId;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "USER_NAME", length = 100)
    private String userName;

    @Column(name = "USER_EMAIL", length = 100)
    private String userEmail;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    @Column(name = "RATING", nullable = false)
    private Integer rating;

    @Column(name = "TITLE", length = 200)
    private String title;

    @Column(name = "COMMENT", columnDefinition = "TEXT")
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", length = 20)
    private ReviewStatus status = ReviewStatus.PENDING;

    @Column(name = "IS_VERIFIED_PURCHASE")
    private Boolean isVerifiedPurchase = false;

    @Column(name = "HELPFUL_COUNT")
    private Integer helpfulCount = 0;

    @Column(name = "NOT_HELPFUL_COUNT")
    private Integer notHelpfulCount = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Column(name = "APPROVED_AT")
    private LocalDateTime approvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (status == ReviewStatus.APPROVED && approvedAt == null) {
            approvedAt = LocalDateTime.now();
        }
    }

    @ComputedAttribute
    @Transient
    public boolean isApproved() {
        return status == ReviewStatus.APPROVED;
    }

    @ComputedAttribute
    @Transient
    public int getTotalVotes() {
        return (helpfulCount != null ? helpfulCount : 0) +
                (notHelpfulCount != null ? notHelpfulCount : 0);
    }

    @ComputedAttribute
    @Transient
    public double getHelpfulPercentage() {
        if (getTotalVotes() == 0)
            return 0;
        return ((double) helpfulCount / getTotalVotes()) * 100;
    }
}