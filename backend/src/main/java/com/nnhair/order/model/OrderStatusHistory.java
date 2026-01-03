package com.nnhair.order.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ORDER_STATUS_HISTORY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@Include(name = "orderStatusHistory")
public class OrderStatusHistory extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 50)
    private OrderStatus status;

    @Column(name = "NOTES", length = 500)
    private String notes;

    @Column(name = "CREATED_BY", length = 100)
    private String createdBy;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    @Override
    public String toString() {
        return "OrderStatusHistory{id=" + id + ", status=" + status + ", createdAt=" + createdAt + "}";
    }
}