package com.nnhair.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nnhair.user.model.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, String> {

    Optional<UserRole> findByRoleName(String roleName);

    boolean existsByRoleName(String roleName);

    Optional<UserRole> findByRoleNameIgnoreCase(String roleName);
}