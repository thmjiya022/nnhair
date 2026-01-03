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
public class UpdateProductHook implements LifeCycleHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope,
            Optional<ChangeSpec> changes) {

        log.info("Updating product: {}", product.getId());

        try {
            // Validate business rules
            validateProductUpdate(product);

            // Business rule: Featured products must have minimum price
            if (Boolean.TRUE.equals(product.getIsFeatured()) &&
                    product.getPrice() != null &&
                    product.getPrice().compareTo(BigDecimal.valueOf(500)) < 0) {
                throw new IllegalArgumentException("Featured products must have price >= R500");
            }

            // Update audit fields
            String currentUser = getCurrentUserId(requestScope);
            product.setUpdatedBy(currentUser);
            product.setUpdatedDate(LocalDateTime.now());

            // Ensure collections are initialized
            if (product.getImageUrls() == null) {
                product.setImageUrls(new ArrayList<>());
            }
            if (product.getVariants() == null) {
                product.setVariants(new HashSet<>());
            }

            log.info("Product updated successfully: {}", product.getId());

        } catch (Exception e) {
            log.error("Error updating product: {}", e.getMessage(), e);
            throw new IllegalArgumentException("Failed to update product: " + e.getMessage(), e);
        }
    }

    private void validateProductUpdate(Product product) {
        // Validate price
        if (product.getPrice() == null) {
            throw new IllegalArgumentException("Product price is required");
        }
        if (product.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Product price cannot be negative");
        }

        // Validate original price if set
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

        // Validate that product is not being deactivated if there are pending orders
        // This would require checking order items in a real system
        if (Boolean.FALSE.equals(product.getIsActive()) && product.getStockQuantity() > 0) {
            log.warn("Deactivating product {} with stock quantity {}",
                    product.getId(), product.getStockQuantity());
        }
    }

    private String getCurrentUserId(RequestScope requestScope) {
        if (requestScope.getUser() != null && requestScope.getUser().getPrincipal() != null) {
            return requestScope.getUser().getPrincipal().toString();
        }
        return "SYSTEM";
    }
}