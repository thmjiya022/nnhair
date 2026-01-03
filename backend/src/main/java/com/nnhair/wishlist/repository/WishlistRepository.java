package com.nnhair.wishlist.repository;

import com.nnhair.wishlist.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, String> {

    Optional<Wishlist> findByUserId(String userId);

    List<Wishlist> findByIsPrivateFalse();

    List<Wishlist> findByUserIdAndNameContainingIgnoreCase(String userId, String name);
}