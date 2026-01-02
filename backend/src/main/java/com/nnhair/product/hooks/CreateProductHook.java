package com.nnhair.product.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseCreateHook;
import com.nnhair.product.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
public class CreateProductHook extends BaseCreateHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope) {

        log.info("Creating product: {}", product.getName());

        // Validate business rules
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Product price must be greater than zero");
        }

        if (product.getStockQuantity() == null || product.getStockQuantity() < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }

        if (product.getOriginalPrice() != null &&
                product.getOriginalPrice().compareTo(product.getPrice()) < 0) {
            throw new IllegalArgumentException("Original price cannot be less than current price");
        }

        // Set audit fields
        product.setCreatedBy(getCurrentUserId(requestScope));
        product.setCreatedDate(java.time.LocalDateTime.now());

        log.info("Product created successfully: {}", product.getSku());
    }
}