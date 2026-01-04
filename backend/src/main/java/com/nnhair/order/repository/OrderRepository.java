package com.nnhair.order.repository;

import com.nnhair.order.model.Order;
import com.nnhair.order.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.nnhair.common.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    // Find orders by user
    Page<Order> findByUserId(String userId, Pageable pageable);

    List<Order> findByUserId(String userId);

    // Find orders by status
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);

    // Find orders by payment status
    Page<Order> findByPaymentStatus(PaymentStatus paymentStatus, Pageable pageable);

    // Find orders by customer email
    Page<Order> findByCustomerEmail(String email, Pageable pageable);

    // Find orders within date range
    Page<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    // Find order by order number
    Optional<Order> findByOrderNumber(String orderNumber);

    // Search orders
    @Query("SELECT o FROM Order o WHERE " +
            "(:search IS NULL OR " +
            "LOWER(o.orderNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(o.customerEmail) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(o.customerName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(o.customerPhone) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Order> searchOrders(@Param("search") String search, Pageable pageable);

    // Count orders by status
    long countByStatus(OrderStatus status);

    // Count orders by user and status
    long countByUserIdAndStatus(String userId, OrderStatus status);

    // Get revenue statistics
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o " +
            "WHERE o.paymentStatus = :paymentStatus AND o.createdAt >= :startDate")
    BigDecimal getRevenueSince(@Param("paymentStatus") PaymentStatus paymentStatus,
            @Param("startDate") LocalDateTime startDate);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o " +
            "WHERE o.paymentStatus = :paymentStatus")
    BigDecimal getTotalRevenue(@Param("paymentStatus") PaymentStatus paymentStatus);

    // Get recent orders
    @Query("SELECT o FROM Order o WHERE o.paymentStatus = :paymentStatus " +
            "ORDER BY o.createdAt DESC")
    List<Order> findRecentOrders(@Param("paymentStatus") PaymentStatus paymentStatus,
            Pageable pageable);

    // Get orders needing shipment
    @Query("SELECT o FROM Order o WHERE o.status IN :statuses " +
            "AND o.paymentStatus = :paymentStatus ORDER BY o.createdAt ASC")
    List<Order> findOrdersReadyForShipping(@Param("statuses") List<OrderStatus> statuses,
            @Param("paymentStatus") PaymentStatus paymentStatus);

    // Check if user has ordered a product
    @Query("SELECT COUNT(o) > 0 FROM Order o JOIN o.items i " +
            "WHERE o.userId = :userId AND i.productId = :productId " +
            "AND o.paymentStatus = :paymentStatus")
    boolean hasUserPurchasedProduct(@Param("userId") String userId,
            @Param("productId") String productId,
            @Param("paymentStatus") PaymentStatus paymentStatus);

    // Find user's latest order
    Optional<Order> findFirstByUserIdOrderByCreatedAtDesc(String userId);

    // Count total orders by user
    long countByUserId(String userId);
}