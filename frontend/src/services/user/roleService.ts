import { apiClient } from '../api/client';
import type { UserRole } from '../../types/user';

export const roleService = {
    // Get all roles
    async getRoles(): Promise<UserRole[]> {
        const response = await apiClient.get<any>('/api/role');
        return response.data;
    },

    // Get role by ID
    async getRoleById(id: string): Promise<UserRole> {
        const response = await apiClient.get<any>(`/api/role/${id}`);
        return response.data;
    },

    // Create role
    async createRole(roleData: Omit<UserRole, 'id'>): Promise<UserRole> {
        const response = await apiClient.post<any>('/api/role', {
            data: {
                type: 'role',
                attributes: roleData
            }
        });
        return response.data;
    },

    // Update role
    async updateRole(id: string, roleData: Partial<UserRole>): Promise<UserRole> {
        const response = await apiClient.patch<any>(`/api/role/${id}`, {
            data: {
                type: 'role',
                id,
                attributes: roleData
            }
        });
        return response.data;
    },

    // Delete role
    async deleteRole(id: string): Promise<void> {
        await apiClient.delete(`/api/role/${id}`);
    },

    // Assign role to user
    async assignRole(userId: string, roleId: string): Promise<void> {
        await apiClient.post(`/api/user/${userId}/roles`, {
            data: [{ type: 'role', id: roleId }]
        });
    },

    // Remove role from user
    async removeRole(userId: string, roleId: string): Promise<void> {
        await apiClient.delete(`/api/user/${userId}/relationships/roles`, {
            data: [{ type: 'role', id: roleId }]
        });
    }
};