import { create } from 'zustand';
import { userService } from '../services/user/userService';
import { roleService } from '../services/user/roleService';
import type { User, UserRole } from '../types/user';

interface UserState {
    users: User[];
    selectedUser: User | null;
    roles: UserRole[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        page: number;
        size: number;
        total: number;
        totalPages: number;
    };

    loadUsers: (params?: any) => Promise<void>;
    loadRoles: () => Promise<void>;
    selectUser: (user: User | null) => void;
    updateUser: (id: string, data: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    assignRole: (userId: string, roleId: string) => Promise<void>;
    removeRole: (userId: string, roleId: string) => Promise<void>;
    clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    roles: [],
    isLoading: false,
    error: null,
    pagination: {
        page: 1,
        size: 10,
        total: 0,
        totalPages: 0,
    },

    loadUsers: async (params = {}) => {
        set({ isLoading: true, error: null });

        try {
            const { data, meta } = await userService.getUsers({
                page: params.page || 1,
                size: params.size || 10,
                search: params.search,
                status: params.status,
                role: params.role,
            });

            set({
                users: data,
                pagination: {
                    page: meta?.page?.number || 1,
                    size: meta?.page?.size || 10,
                    total: meta?.page?.total || data.length,
                    totalPages: meta?.page?.totalPages || 1,
                },
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to load users',
                isLoading: false,
            });
        }
    },

    loadRoles: async () => {
        try {
            const roles = await roleService.getRoles();
            set({ roles });
        } catch (error) {
            console.error('Failed to load roles:', error);
        }
    },

    selectUser: (user) => set({ selectedUser: user }),

    updateUser: async (id: string, data: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
            await userService.updateUser(id, data);
            await get().loadUsers();
            set({ isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Update failed',
                isLoading: false,
            });
            throw error;
        }
    },

    deleteUser: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
            await userService.deleteUser(id);
            await get().loadUsers();
            set({ isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Delete failed',
                isLoading: false,
            });
            throw error;
        }
    },

    assignRole: async (userId: string, roleId: string) => {
        try {
            await roleService.assignRole(userId, roleId);
            await get().loadUsers();
        } catch (error: any) {
            throw error;
        }
    },

    removeRole: async (userId: string, roleId: string) => {
        try {
            await roleService.removeRole(userId, roleId);
            await get().loadUsers();
        } catch (error: any) {
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));