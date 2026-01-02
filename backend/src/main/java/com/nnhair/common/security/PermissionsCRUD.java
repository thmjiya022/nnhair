package com.nnhair.common.security;

public class PermissionsCRUD {
    public static class RoleCreatePermissions {
        public static final String HAS_CREATE_PERMISSIONS = "Principal is Admin";
        public static final String HAS_CREATE_ORDER_PERMISSIONS = "Principal is Authenticated";
    }

    public static class RoleReadPermissions {
        public static final String READ_PUBLIC_DATA = "Principal is Authenticated";
        public static final String READ_ADMIN_DATA = "Principal is Admin";
    }

    public static class RoleUpdatePermissions {
        public static final String HAS_UPDATE_PERMISSIONS = "Principal is Admin";
        public static final String HAS_UPDATE_OWN_ORDER_PERMISSIONS = "Principal is Owner";
    }

    public static class RoleDeletePermissions {
        public static final String HAS_DELETE_PERMISSIONS = "Principal is Admin";
    }
}
