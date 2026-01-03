package com.nnhair.cart.repository;

import com.nnhair.cart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

    Optional<Cart> findByUserIdAndIsActiveTrue(String userId);

    Optional<Cart> findBySessionIdAndIsActiveTrue(String sessionId);

    List<Cart> findByExpiresAtBeforeAndIsActiveTrue(LocalDateTime date);

    List<Cart> findByIsActiveFalse();

    @Modifying
    @Query("UPDATE Cart c SET c.isActive = false WHERE c.expiresAt < :now AND c.isActive = true")
    int deactivateExpiredCarts(@Param("now") LocalDateTime now);

    @Query("SELECT c FROM Cart c WHERE c.userId = :userId ORDER BY c.createdAt DESC")
    List<Cart> findUserCartHistory(@Param("userId") String userId);
}