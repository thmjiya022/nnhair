// src/main/java/com/nnhair/user/hooks/SoftDeleteUserHook.java
package com.nnhair.user.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseDeleteHook;
import com.nnhair.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
public class SoftDeleteUserHook extends BaseDeleteHook<User> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            User user,
            RequestScope requestScope) {

        log.info("Soft deleting user: {}", user.getId());

        // Instead of hard delete, mark as deleted
        user.setStatus(com.nnhair.user.model.UserStatus.DELETED);
        user.setUpdatedBy(getCurrentUserId(requestScope));
        user.setUpdatedDate(LocalDateTime.now());

        // Throw exception to prevent actual deletion
        throwSoftDeleteException("User soft-deleted (marked as DELETED): " + user.getId());

        log.info("User soft-deleted: {}", user.getId());
    }
}