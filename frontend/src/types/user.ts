export const UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SUSPENDED: 'SUSPENDED',
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',
    DELETED: 'DELETED',
} as const;

export type UserStatus =
    typeof UserStatus[keyof typeof UserStatus];

export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    status: UserStatus;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLogin?: string;
    failedLoginAttempts: number;
    accountLockedUntil?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
    roles: UserRole[];
    createdBy?: string;
    createdDate?: string;
    updatedBy?: string;
    updatedDate?: string;
    fullName?: string;
    isAdmin?: boolean;
    isLocked?: boolean;
}

export interface UserRole {
    id: string;
    roleName: string;
    description?: string;
    permissions: string[];
    isSystemRole?: boolean;
}

export interface Address {
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isDefault?: boolean;
    formattedAddress?: string;
    isComplete?: boolean;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    user: User;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}