package com.nnhair.product.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.lifecycle.LifeCycleHook;
import com.yahoo.elide.core.security.ChangeSpec;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.product.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

@Slf4j
@Component
public class CreateProductHook implements LifeCycleHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope,
            Optional<ChangeSpec> changes) {

        log.info("Creating product: {}", product.getName());

        try {
            // Validate business rules
            validateProduct(product);

            // Set audit fields
            String currentUser = getCurrentUserId(requestScope);
            product.setCreatedBy(currentUser);
            product.setCreatedDate(LocalDateTime.now());

            // Generate SKU if not provided
            if (product.getSku() == null || product.getSku().trim().isEmpty()) {
                String sku = generateSku(product);
                product.setSku(sku);
            }

            // Initialize collections if null
            if (product.getImageUrls() == null) {
                product.setImageUrls(new ArrayList<>());
            }
            if (product.getVariants() == null) {
                product.setVariants(new HashSet<>());
            }

            log.info("Product created successfully: {} with SKU: {}",
                    product.getName(), product.getSku());

        } catch (Exception e) {
            log.error("Error creating product: {}", e.getMessage(), e);
            throw new IllegalArgumentException("Failed to create product: " + e.getMessage(), e);
        }
    }

    private void validateProduct(Product product) {
        // Validate price
        if (product.getPrice() == null) {
            throw new IllegalArgumentException("Product price is required");
        }
        if (product.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Product price cannot be negative");
        }
        if (product.getPrice().compareTo(BigDecimal.ZERO) == 0) {
            log.warn("Product price is zero for product: {}", product.getName());
        }

        // Validate original price
        if (product.getOriginalPrice() != null) {
            if (product.getOriginalPrice().compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Original price cannot be negative");
            }
            if (product.getOriginalPrice().compareTo(product.getPrice()) < 0) {
                throw new IllegalArgumentException("Original price cannot be less than current price");
            }
        }

        // Validate stock quantity
        if (product.getStockQuantity() == null) {
            product.setStockQuantity(0);
        }
        if (product.getStockQuantity() < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }

        // Validate category
        if (product.getCategory() == null) {
            throw new IllegalArgumentException("Product category is required");
        }

        // Validate texture
        if (product.getTexture() == null) {
            throw new IllegalArgumentException("Hair texture is required");
        }

        // Validate name
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (product.getName().length() > 255) {
            throw new IllegalArgumentException("Product name cannot exceed 255 characters");
        }
    }

    private String generateSku(Product product) {
        String prefix = "NNH";
        String categoryCode = product.getCategory() != null
                ? product.getCategory().name().substring(0, Math.min(3, product.getCategory().name().length()))
                : "GEN";
        String textureCode = product.getTexture() != null
                ? product.getTexture().name().substring(0, Math.min(2, product.getTexture().name().length()))
                : "ST";

        // Add timestamp for uniqueness
        String timestamp = String.valueOf(System.currentTimeMillis() % 100000);

        // Add random component
        String random = String.format("%03d", (int) (Math.random() * 1000));

        return String.format("%s-%s-%s-%s-%s",
                prefix,
                categoryCode,
                textureCode,
                timestamp.substring(Math.max(0, timestamp.length() - 4)),
                random);
    }

    private String getCurrentUserId(RequestScope requestScope) {
        if (requestScope.getUser() != null && requestScope.getUser().getPrincipal() != null) {
            return requestScope.getUser().getPrincipal().toString();
        }
        return "SYSTEM";
    }
}