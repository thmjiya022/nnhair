import { apiClient } from './client';
import type { LoginRequest, LoginResponse, CreateUserRequest, User } from '../../types/user';

export const authService = {
    // Basic auth login (matches your Spring Security config)
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const credentialsBase64 = btoa(`${credentials.email}:${credentials.password}`);

        const response = await apiClient.post<LoginResponse>('/auth/login', null, {
            headers: {
                Authorization: `Basic ${credentialsBase64}`
            }
        });

        // Store tokens
        if (response.accessToken) {
            localStorage.setItem('access_token', response.accessToken);
        }
        if (response.refreshToken) {
            localStorage.setItem('refresh_token', response.refreshToken);
        }

        return response;
    },

    // Register new user
    async register(userData: CreateUserRequest): Promise<User> {
        const response = await apiClient.post<any>('/api/user', {
            data: {
                type: 'user',
                attributes: {
                    ...userData,
                    status: 'ACTIVE'
                }
            }
        });

        return response.data;
    },

    // Logout
    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            await apiClient.post('/auth/logout', { refreshToken });
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    // Get current user
    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<any>('/api/user/me');
        return response.data;
    },

    // Refresh token
    async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        const response = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
        return response;
    },

    // Forgot password
    async forgotPassword(email: string): Promise<void> {
        await apiClient.post('/auth/forgot-password', { email });
    },

    // Reset password
    async resetPassword(token: string, newPassword: string): Promise<void> {
        await apiClient.post('/auth/reset-password', { token, newPassword });
    }
};