package com.nnhair.security.checks;

import com.yahoo.elide.core.security.User;
import com.yahoo.elide.core.security.checks.UserCheck;
import org.springframework.stereotype.Component;

@Component
public class CustomSecurityChecks {

    public static class IsAdmin extends UserCheck {
        @Override
        public boolean ok(User user) {
            return user != null && user.getPrincipal() != null && "admin".equals(user.getPrincipal().toString());
        }
    }

    public static class IsAuthenticated extends UserCheck {
        @Override
        public boolean ok(User user) {
            return user != null && user.getPrincipal() != null;
        }
    }

    public static class IsOwner extends UserCheck {
        @Override
        public boolean ok(User user) {
            return user != null && user.getPrincipal() != null;
        }
    }
}