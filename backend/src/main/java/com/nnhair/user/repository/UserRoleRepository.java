// src/main/java/com/nnhair/user/repository/UserRoleRepository.java
package com.nnhair.user.repository;

import com.nnhair.user.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, String> {

    Optional<UserRole> findByRoleName(String roleName);

    boolean existsByRoleName(String roleName);

    Optional<UserRole> findByRoleNameIgnoreCase(String roleName);
}