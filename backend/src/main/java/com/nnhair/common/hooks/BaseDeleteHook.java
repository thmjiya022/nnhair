package com.nnhair.common.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.yahoo.elide.core.security.User;
import jakarta.persistence.PersistenceException;

public abstract class BaseDeleteHook<T> {

    public abstract void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            T entity,
            RequestScope requestScope);

    protected String getCurrentUserId(RequestScope requestScope) {
        User user = requestScope.getUser();
        return user != null ? user.getName() : "system";
    }

    protected void throwSoftDeleteException(String message) {
        throw new PersistenceException(message);
    }
}