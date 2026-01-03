package com.nnhair.config;

import com.nnhair.user.model.UserRole;
import com.nnhair.user.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserRoleRepository userRoleRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            log.info("Initializing default data...");

            // Create default roles if they don't exist
            createRoleIfNotExists("SUPER_ADMIN", "Super Administrator with all permissions",
                    Arrays.asList("ALL"));
            createRoleIfNotExists("ADMIN", "Administrator",
                    Arrays.asList("READ_ALL", "WRITE_ALL", "DELETE_ALL"));
            createRoleIfNotExists("USER", "Regular user",
                    Arrays.asList("READ_SELF", "WRITE_SELF"));
            createRoleIfNotExists("GUEST", "Guest user",
                    Arrays.asList("READ_PUBLIC"));

            log.info("Data initialization completed.");
        };
    }

    private void createRoleIfNotExists(String roleName, String description, java.util.List<String> permissions) {
        if (!userRoleRepository.existsByRoleName(roleName)) {
            UserRole role = UserRole.builder()
                    .roleName(roleName)
                    .description(description)
                    .permissions(new HashSet<>(permissions))
                    .build();
            userRoleRepository.save(role);
            log.info("Created role: {}", roleName);
        }
    }
}