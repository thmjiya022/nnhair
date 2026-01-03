package com.nnhair.user.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import com.nnhair.common.validation.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@XmlAccessorType(XmlAccessType.NONE)
@BaseDomainValidation
@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Admin OR Principal is Guest")
@ReadPermission(expression = "Principal is Owner OR Principal is Admin")
@UpdatePermission(expression = "Principal is Owner OR Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(rootLevel = true, name = "user")
public class User extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @NotBlankAndRange(fieldName = "Username", min = 3, max = 50)
    @Column(name = "USERNAME", unique = true, nullable = false, length = 50)
    private String username;

    @Email(message = "Email should be valid")
    @NotBlankAndRange(fieldName = "Email", min = 5, max = 100)
    @Column(name = "EMAIL", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "PASSWORD_HASH", nullable = false, length = 255)
    private String passwordHash;

    @NotBlankAndRange(fieldName = "First Name", min = 1, max = 50)
    @Column(name = "FIRST_NAME", length = 50)
    private String firstName;

    @NotBlankAndRange(fieldName = "Last Name", min = 1, max = 50)
    @Column(name = "LAST_NAME", length = 50)
    private String lastName;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
    @Column(name = "PHONE", length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", length = 20)
    private UserStatus status = UserStatus.ACTIVE;

    @Column(name = "IS_EMAIL_VERIFIED")
    private Boolean isEmailVerified = false;

    @Column(name = "IS_PHONE_VERIFIED")
    private Boolean isPhoneVerified = false;

    @Column(name = "LAST_LOGIN")
    private LocalDateTime lastLogin;

    @Column(name = "FAILED_LOGIN_ATTEMPTS")
    private Integer failedLoginAttempts = 0;

    @Column(name = "ACCOUNT_LOCKED_UNTIL")
    private LocalDateTime accountLockedUntil;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name="streetAddres", column = @Column(name = "BILLING_STREET")),
        @AttributeOverride(name = "city", column = @Column(name = "BILLING_CITY")),
        @AttributeOverride(name = "state", column = @Column(name = "BILLING_STATE")),
        @AttributeOverride(name = "postalCode", column = @Column(name = "BILLING_POSTAL_CODE")),
        @AttributeOverride(name = "country", column = @Column(name = "BILLING_COUNTRY")),
        @AttributeOverride(name = "isDefault", column = @Column(name = "BILLING_IS_DEFAULT"))
    })
    private Address billingAddress;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "streetAddress", column = @Column(name = "SHIPPING_STREET")),
        @AttributeOverride(name = "city", column = @Column(name = "SHIPPING_CITY")),
        @AttributeOverride(name = "state", column = @Column(name = "SHIPPING_STATE")),
        @AttributeOverride(name = "postalCode", column = @Column(name = "SHIPPING_POSTAL_CODE")),
        @AttributeOverride(name = "country", column = @Column(name = "SHIPPING_COUNTRY")),
        @AttributeOverride(name = "isDefault", column = @Column(name = "SHIPPING_IS_DEFAULT"))
    })
    private Address shippingAddress;

    @XmlTransient
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "USER_ROLES", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    @Builder.Default
    private Set<UserRole> roles = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = UserStatus.ACTIVE;
        }
        if (isEmailVerified == null) {
            isEmailVerified = false;
        }
        if (isPhoneVerified == null) {
            isPhoneVerified = false;
        }
    }

    @ComputedAttribute
    @Transient
    public String getFullName() {
        return (firstName != null ? firstName + " " : "") + (lastName != null ? lastName : "");
    }

    @ComputedAttribute
    @Transient
    public boolean isAdmin() {
        return roles.stream()
                .anyMatch(role -> role.getRoleName().equals("ADMIN") || role.getRoleName().equals("SUPER_ADMIN"));
    }

    @ComputedAttribute
    @Transient
    public boolean isLocked() {
        return accountLockedUntil != null && accountLockedUntil.isAfter(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "User{id='" + id + "', username='" + username + "', email='" + email + "'}";
    }
}