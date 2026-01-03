// src/main/java/com/nnhair/product/repository/ProductRepository.java
package com.nnhair.product.repository;

import com.nnhair.product.model.Product;
import com.nnhair.product.model.ProductCategory;
import com.nnhair.product.model.HairTexture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Active products queries
    Page<Product> findByIsActiveTrue(Pageable pageable);

    Page<Product> findByCategoryAndIsActiveTrue(ProductCategory category, Pageable pageable);

    Page<Product> findByTextureAndIsActiveTrue(HairTexture texture, Pageable pageable);

    Page<Product> findByCategoryAndTextureAndIsActiveTrue(ProductCategory category, HairTexture texture,
            Pageable pageable);

    Page<Product> findByIsFeaturedTrueAndIsActiveTrue(Pageable pageable);

    Page<Product> findByPriceBetweenAndIsActiveTrue(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    Page<Product> findByStockQuantityGreaterThanAndIsActiveTrue(Integer minStock, Pageable pageable);

    // Find products by IDs
    List<Product> findByIdInAndIsActiveTrue(List<Long> ids);

    // Find by SKU
    Optional<Product> findBySkuAndIsActiveTrue(String sku);

    boolean existsBySkuAndIsActiveTrue(String sku);

    boolean existsBySku(String sku);

    // Search products
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.sku) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.material) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> searchProducts(@Param("search") String search, Pageable pageable);

    // Advanced search with filters
    @Query("SELECT p FROM Product p WHERE p.isActive = true " +
            "AND (:category IS NULL OR p.category = :category) " +
            "AND (:texture IS NULL OR p.texture = :texture) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:inStockOnly IS NULL OR :inStockOnly = false OR p.stockQuantity > 0) " +
            "AND (:featuredOnly IS NULL OR :featuredOnly = false OR p.isFeatured = true)")
    Page<Product> searchProductsWithFilters(
            @Param("category") ProductCategory category,
            @Param("texture") HairTexture texture,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("inStockOnly") Boolean inStockOnly,
            @Param("featuredOnly") Boolean featuredOnly,
            Pageable pageable);

    // Statistics
    @Query("SELECT COUNT(p) FROM Product p WHERE p.isActive = true")
    long countActiveProducts();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.isActive = true AND p.stockQuantity > 0")
    long countInStockProducts();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.isActive = true AND p.isFeatured = true")
    long countFeaturedProducts();

    @Query("SELECT p.category, COUNT(p) FROM Product p WHERE p.isActive = true GROUP BY p.category")
    List<Object[]> getCategoryDistribution();

    @Query("SELECT p.texture, COUNT(p) FROM Product p WHERE p.isActive = true GROUP BY p.texture")
    List<Object[]> getTextureDistribution();

    @Query("SELECT MIN(p.price), MAX(p.price), AVG(p.price) FROM Product p WHERE p.isActive = true")
    Object[] getPriceStatistics();

    // Find related products
    @Query("SELECT p FROM Product p WHERE p.isActive = true " +
            "AND p.category = :category " +
            "AND p.id != :excludeId " +
            "ORDER BY p.isFeatured DESC, p.createdDate DESC")
    Page<Product> findRelatedProducts(
            @Param("category") ProductCategory category,
            @Param("excludeId") Long excludeId,
            Pageable pageable);

    // Find products on sale
    @Query("SELECT p FROM Product p WHERE p.isActive = true " +
            "AND p.originalPrice IS NOT NULL " +
            "AND p.originalPrice > p.price " +
            "ORDER BY (p.originalPrice - p.price) / p.originalPrice DESC")
    Page<Product> findProductsOnSale(Pageable pageable);

    // Update stock
    @Query("UPDATE Product p SET p.stockQuantity = p.stockQuantity - :quantity " +
            "WHERE p.id = :productId AND p.stockQuantity >= :quantity")
    int decrementStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);

    @Query("UPDATE Product p SET p.stockQuantity = p.stockQuantity + :quantity " +
            "WHERE p.id = :productId")
    int incrementStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);
}