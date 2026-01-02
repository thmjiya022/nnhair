package com.nnhair.product.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseDeleteHook;
import com.nnhair.product.model.Product;
import jakarta.persistence.PersistenceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SoftDeleteProductHook extends BaseDeleteHook<Product> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            Product product,
            RequestScope requestScope) {

        log.info("Soft deleting product: {}", product.getId());

        // Instead of hard delete, mark as inactive
        product.setIsActive(false);
        product.setUpdatedBy(getCurrentUserId(requestScope));
        product.setUpdatedDate(java.time.LocalDateTime.now());

        // Throw exception to prevent actual deletion from database
        throwSoftDeleteException("Product soft-deleted (marked inactive): " + product.getId());

        log.info("Product soft-deleted: {}", product.getId());
    }
}