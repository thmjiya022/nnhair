// src/main/java/com/nnhair/user/model/UserRole.java
package com.nnhair.user.model;

import com.yahoo.elide.annotation.*;
import com.nnhair.common.model.BaseDomain;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@XmlAccessorType(XmlAccessType.NONE)
@Entity
@Table(name = "ROLES")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CreatePermission(expression = "Principal is Admin")
@ReadPermission(expression = "Principal is Admin")
@UpdatePermission(expression = "Principal is Admin")
@DeletePermission(expression = "Principal is Admin")
@Include(name = "role")
public class UserRole extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Column(name = "ROLE_NAME", unique = true, nullable = false, length = 50)
    private String roleName;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;

    @XmlElementWrapper(name = "permissions")
    @XmlElement(name = "permission")
    @ElementCollection
    @CollectionTable(name = "ROLE_PERMISSIONS", joinColumns = @JoinColumn(name = "ROLE_ID"))
    @Column(name = "PERMISSION")
    @Builder.Default
    private Set<String> permissions = new HashSet<>();

    @XmlTransient
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @ComputedAttribute
    @Transient
    public boolean isSystemRole() {
        return roleName.equals("ADMIN") || roleName.equals("USER") || roleName.equals("GUEST");
    }

    @Override
    public String toString() {
        return "UserRole{id='" + id + "', roleName='" + roleName + "'}";
    }
}