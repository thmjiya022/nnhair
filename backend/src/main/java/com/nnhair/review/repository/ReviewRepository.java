package com.nnhair.review.repository;

import com.nnhair.review.model.Review;
import com.nnhair.review.model.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    Page<Review> findByProductId(Long productId, Pageable pageable);

    Page<Review> findByProductIdAndStatus(Long productId, ReviewStatus status, Pageable pageable);

    Page<Review> findByUserId(String userId, Pageable pageable);

    Page<Review> findByStatus(ReviewStatus status, Pageable pageable);

    Optional<Review> findByProductIdAndUserId(Long productId, String userId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId = :productId AND r.status = 'APPROVED'")
    Double getAverageRating(@Param("productId") Long productId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productId = :productId AND r.status = 'APPROVED'")
    Long countByProductId(@Param("productId") Long productId);

    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.productId = :productId AND r.status = 'APPROVED' GROUP BY r.rating")
    List<Object[]> getRatingDistribution(@Param("productId") Long productId);

    @Query("SELECT r FROM Review r WHERE r.isVerifiedPurchase = true AND r.status = 'APPROVED' ORDER BY r.createdAt DESC")
    Page<Review> findVerifiedReviews(Pageable pageable);
}