// src/main/java/com/nnhair/user/hooks/UpdateUserHook.java
package com.nnhair.user.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseUpdateHook;
import com.nnhair.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
public class UpdateUserHook extends BaseUpdateHook<User> {

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            User user,
            RequestScope requestScope) {

        log.info("Updating user: {}", user.getId());

        // Prevent admin demotion check (in real system)
        String currentUser = getCurrentUserId(requestScope);

        // Update audit fields
        user.setUpdatedBy(currentUser);
        user.setUpdatedDate(LocalDateTime.now());

        log.info("User updated: {}", user.getId());
    }
}