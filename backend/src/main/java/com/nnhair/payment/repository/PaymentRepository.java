// src/main/java/com/nnhair/payment/repository/PaymentRepository.java
package com.nnhair.payment.repository;

import com.nnhair.payment.model.Payment;
import com.nnhair.payment.model.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    Optional<Payment> findByTransactionId(String transactionId);

    Optional<Payment> findByOrderId(String orderId);

    Page<Payment> findByUserId(String userId, Pageable pageable);

    Page<Payment> findByPaymentStatus(PaymentStatus status, Pageable pageable);

    Page<Payment> findByPaymentMethod(String paymentMethod, Pageable pageable);

    @Query("SELECT p FROM Payment p WHERE p.createdAt BETWEEN :startDate AND :endDate")
    Page<Payment> findByDateRange(@Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentStatus = :status")
    BigDecimal getTotalAmountByStatus(@Param("status") PaymentStatus status);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus = :status")
    long countByPaymentStatus(@Param("status") PaymentStatus status);

    @Query("SELECT p FROM Payment p WHERE p.paymentStatus = :status AND p.paidAt IS NOT NULL")
    List<Payment> findSuccessfulPayments(@Param("status") PaymentStatus status);
}