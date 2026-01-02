package com.nnhair.product.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseUpdateHook;
import com.nnhair.product.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
public class UpdateProductHook extends BaseUpdateHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope) {

        log.info("Updating product: {}", product.getId());

        // Business rule: Featured products must have minimum price
        if (Boolean.TRUE.equals(product.getIsFeatured()) &&
                product.getPrice().compareTo(BigDecimal.valueOf(500)) < 0) {
            throw new IllegalArgumentException("Featured products must have price >= R500");
        }

        // Update audit fields
        product.setUpdatedBy(getCurrentUserId(requestScope));
        product.setUpdatedDate(java.time.LocalDateTime.now());

        log.info("Product updated successfully: {}", product.getId());
    }
}