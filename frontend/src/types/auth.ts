import type { User } from "./user";

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: CreateUserRequest) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    refreshToken: () => Promise<void>;
}