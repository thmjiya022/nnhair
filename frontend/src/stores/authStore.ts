import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService,  } from '../services/api/auth';
import { userService } from '../services/user/userService';
import type { User } from '../types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: localStorage.getItem('access_token'),
            isAuthenticated: !!localStorage.getItem('access_token'),
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authService.login({ email, password });

                    set({
                        user: response.user,
                        token: response.accessToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (userData: any) => {
                set({ isLoading: true, error: null });

                try {
                    await authService.register(userData);
                    set({ isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Registration failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                    });
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            },

            loadUser: async () => {
                const token = localStorage.getItem('access_token');
                if (!token) return;

                set({ isLoading: true });

                try {
                    const user = await authService.getCurrentUser();
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('Failed to load user:', error);
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            },

            updateProfile: async (userData: Partial<User>) => {
                set({ isLoading: true, error: null });

                try {
                    const { user } = get();
                    if (!user) throw new Error('No user found');

                    const updatedUser = await userService.updateUser(user.id, userData);
                    set({
                        user: { ...user, ...updatedUser },
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Update failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);