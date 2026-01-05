package com.nnhair.config;

import java.time.LocalDateTime;
import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nnhair.user.model.User;
import com.nnhair.user.model.UserRole;
import com.nnhair.user.model.UserStatus;
import com.nnhair.user.repository.UserRepository;
import com.nnhair.user.repository.UserRoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataLoader {

    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        return args -> {
            
            log.info("Loading initial data...");

            // Create default roles
            createDefaultRoles(userRoleRepository);

            // Create admin user if not exists
            createAdminUser(userRepository, userRoleRepository);

            log.info("Initial data loaded successfully");
        };
    }

    private void createDefaultRoles(UserRoleRepository repository) {
        String[][] roles = {
                { "SUPER_ADMIN", "Super Administrator with all permissions" },
                { "ADMIN", "Administrator with full access" },
                { "USER", "Regular user with limited access" },
                { "CUSTOMER", "Customer role for shopping" },
                { "GUEST", "Guest user with minimal permissions" }
        };

        for (String[] roleData : roles) {
            if (!repository.existsByRoleName(roleData[0])) {
                UserRole role = UserRole.builder()
                        .roleName(roleData[0])
                        .description(roleData[1])
                        .permissions(new HashSet<>())
                        .build();
                repository.save(role);
                log.info("Created role: {}", roleData[0]);
            }
        }
    }

    private void createAdminUser(UserRepository userRepository, UserRoleRepository roleRepository) {
        String adminEmail = "admin@nnhair.co.za";

        if (!userRepository.existsByEmail(adminEmail)) {
            UserRole adminRole = roleRepository.findByRoleName("ADMIN")
                    .orElseGet(() -> {
                        UserRole role = UserRole.builder()
                                .roleName("ADMIN")
                                .description("Administrator")
                                .permissions(new HashSet<>())
                                .build();
                        return roleRepository.save(role);
                    });

            // Create user with builder and set fields properly
            User admin = User.builder()
                    .username("admin")
                    .email(adminEmail)
                    .passwordHash(passwordEncoder.encode("Admin@123"))
                    .firstName("nontando")
                    .lastName("dludla")
                    .status(UserStatus.ACTIVE)
                    .isEmailVerified(true)
                    .isPhoneVerified(false)
                    .roles(new HashSet<>())
                    .build();

            // Set the date fields directly since they come from BaseDomain
            admin.setCreatedDate(LocalDateTime.now());

            // Add admin role
            admin.getRoles().add(adminRole);

            // Save the user
            userRepository.save(admin);

            log.info("Created admin user: {}", adminEmail);
        }
    }
}