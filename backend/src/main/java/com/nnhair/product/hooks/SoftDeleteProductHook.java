package com.nnhair.product.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.lifecycle.LifeCycleHook;
import com.yahoo.elide.core.security.ChangeSpec;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.product.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
public class SoftDeleteProductHook implements LifeCycleHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope,
            Optional<ChangeSpec> changes) {

        log.info("Soft deleting product: {}", product.getId());

        // Check if product can be deactivated (business rules)
        if (Boolean.FALSE.equals(product.getIsActive())) {
            log.warn("Product {} is already deactivated", product.getId());
            throw new IllegalStateException("Product is already deactivated: " + product.getId());
        }

        String currentUser = getCurrentUserId(requestScope);

        // Instead of hard delete, mark as inactive
        product.setIsActive(false);
        product.setUpdatedBy(currentUser);
        product.setUpdatedDate(LocalDateTime.now());

        // Also deactivate all variants
        if (product.getVariants() != null) {
            product.getVariants().forEach(variant -> {
                variant.setIsActive(false);
                variant.setUpdatedBy(currentUser);
                variant.setUpdatedDate(LocalDateTime.now());
            });
        }

        log.info("Product soft-deleted (marked inactive): {} with {} variants",
                product.getId(),
                product.getVariants() != null ? product.getVariants().size() : 0);

        // Throw exception to prevent actual deletion from database
        throw new IllegalStateException("Product soft-deleted (marked inactive): " + product.getId());
    }

    private String getCurrentUserId(RequestScope requestScope) {
        if (requestScope.getUser() != null && requestScope.getUser().getPrincipal() != null) {
            return requestScope.getUser().getPrincipal().toString();
        }
        return "SYSTEM";
    }
}