package com.nnhair.user.hooks;

import com.yahoo.elide.annotation.LifeCycleHookBinding;
import com.yahoo.elide.core.security.RequestScope;
import com.nnhair.common.hooks.BaseCreateHook;
import com.nnhair.user.model.User;
import com.nnhair.user.model.UserRole;
import com.nnhair.user.repository.UserRoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
public class CreateUserHook extends BaseCreateHook<User> {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public void execute(LifeCycleHookBinding.Operation operation,
            LifeCycleHookBinding.TransactionPhase phase,
            User user,
            RequestScope requestScope) {

        log.info("Creating user: {}", user.getEmail());

        // Hash password if present
        if (user.getPasswordHash() != null && !user.getPasswordHash().startsWith("$2a$")) {
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        }

        // Set default role if no roles specified
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Optional<UserRole> userRole = userRoleRepository.findByRoleName("USER");
            if (userRole.isPresent()) {
                user.getRoles().add(userRole.get());
            }
        }

        // Set audit fields
        user.setCreatedBy(getCurrentUserId(requestScope));
        user.setCreatedDate(LocalDateTime.now());

        // Set initial status
        if (user.getStatus() == null) {
            user.setStatus(com.nnhair.user.model.UserStatus.ACTIVE);
        }

        log.info("User created successfully: {}", user.getEmail());
    }
}