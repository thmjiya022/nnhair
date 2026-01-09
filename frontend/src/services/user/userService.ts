import { apiClient } from '../api/client';
import type { User, UpdateUserRequest, ChangePasswordRequest } from '../../types/user';

export const userService = {
    // Get user by ID
    async getUserById(id: string): Promise<User> {
        const response = await apiClient.get<any>(`/api/user/${id}`);
        return response.data;
    },

    // Get all users (admin only)
    async getUsers(params?: {
        page?: number;
        size?: number;
        search?: string;
        status?: string;
        role?: string;
    }): Promise<{ data: User[]; meta: any }> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page[number]', params.page.toString());
        if (params?.size) queryParams.append('page[size]', params.size.toString());
        if (params?.search) queryParams.append('filter[search]', params.search);
        if (params?.status) queryParams.append('filter[status]', params.status);
        if (params?.role) queryParams.append('filter[role]', params.role);

        const response = await apiClient.get<any>(`/api/user?${queryParams.toString()}`);
        return response;
    },

    // Update user
    async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
        const response = await apiClient.patch<any>(`/api/user/${id}`, {
            data: {
                type: 'user',
                id,
                attributes: userData
            }
        });
        return response.data;
    },

    // Change password
    async changePassword(id: string, passwords: ChangePasswordRequest): Promise<void> {
        await apiClient.post(`/api/user/${id}/change-password`, passwords);
    },

    // Update user status (admin only)
    async updateStatus(id: string, status: string): Promise<User> {
        const response = await apiClient.patch<any>(`/api/user/${id}`, {
            data: {
                type: 'user',
                id,
                attributes: { status }
            }
        });
        return response.data;
    },

    // Delete user (soft delete)
    async deleteUser(id: string): Promise<void> {
        await apiClient.delete(`/api/user/${id}`);
    },

    // Verify email
    async verifyEmail(token: string): Promise<void> {
        await apiClient.post('/auth/verify-email', { token });
    },

    // Verify phone
    async verifyPhone(code: string): Promise<void> {
        await apiClient.post('/auth/verify-phone', { code });
    },

    // Request phone verification
    async requestPhoneVerification(): Promise<void> {
        await apiClient.post('/auth/request-phone-verification');
    },

    // Get user statistics (admin only)
    async getUserStats(): Promise<{
        total: number;
        active: number;
        pending: number;
        locked: number;
    }> {
        const response = await apiClient.get<any>('/api/user/stats');
        return response.data;
    }
};