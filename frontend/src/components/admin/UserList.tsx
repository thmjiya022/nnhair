import React, { useState, useEffect } from 'react';
import { Search, Download, Users, UserPlus } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { type User, UserStatus } from '../../types/user';
import UserCard from '../user/UserCard';
import Input from '../ui/Input';
import Button from '../ui/Button';
import UserEditModal from './UserEditModal';
import RoleManagement from './RoleManagement';

const UserList: React.FC = () => {
    const {
        users,
        isLoading,
        pagination,
        loadUsers,
        selectUser,
        selectedUser,
        loadRoles,
    } = useUserStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
    const [roleFilter, setRoleFilter] = useState<string>('ALL');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedUserForRole, setSelectedUserForRole] = useState<User | null>(null);

    useEffect(() => {
        loadUsers();
        loadRoles();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadUsers({
                search: searchTerm,
                status: statusFilter !== 'ALL' ? statusFilter : undefined,
                role: roleFilter !== 'ALL' ? roleFilter : undefined,
                page: 1,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter, roleFilter]);

    const handlePageChange = (page: number) => {
        loadUsers({
            search: searchTerm,
            status: statusFilter !== 'ALL' ? statusFilter : undefined,
            role: roleFilter !== 'ALL' ? roleFilter : undefined,
            page,
        });
    };

    const handleEditUser = (user: User) => {
        selectUser(user);
        setShowEditModal(true);
    };

    const handleAssignRole = (user: User) => {
        setSelectedUserForRole(user);
        setShowRoleModal(true);
    };

    const handleDeleteUser = async (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.fullName || user.username}?`)) {
            // Delete logic will be implemented in the store
            console.log('Delete user:', user.id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" leftIcon={<Download size={18} />}>
                        Export
                    </Button>
                    <Button variant="primary" leftIcon={<UserPlus size={18} />}>
                        Add User
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold mt-1">{pagination.total}</p>
                        </div>
                        <Users className="h-8 w-8 text-primary-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Users</p>
                            <p className="text-2xl font-bold mt-1">
                                {users.filter(u => u.status === UserStatus.ACTIVE).length}
                            </p>
                        </div>
                        <Users className="h-8 w-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Verification</p>
                            <p className="text-2xl font-bold mt-1">
                                {users.filter(u => u.status === UserStatus.PENDING_VERIFICATION).length}
                            </p>
                        </div>
                        <Users className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Admins</p>
                            <p className="text-2xl font-bold mt-1">
                                {users.filter(u => u.isAdmin).length}
                            </p>
                        </div>
                        <Users className="h-8 w-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftIcon={<Search size={18} className="text-gray-400" />}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'ALL')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                        <option value="ALL">All Status</option>
                        {Object.values(UserStatus).map((status) => (
                            <option key={status} value={status}>
                                {status.replace('_', ' ')}
                            </option>
                        ))}
                    </select>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="CUSTOMER">Customer</option>
                    </select>
                </div>
            </div>

            {/* Users Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : users.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {users.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                showActions
                                onEdit={() => handleEditUser(user)}
                                onDelete={() => handleDeleteUser(user)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                            >
                                Previous
                            </Button>

                            <span className="text-sm text-gray-600">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>

                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Modals */}
            {showEditModal && selectedUser && (
                <UserEditModal
                    user={selectedUser}
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        selectUser(null);
                    }}
                />
            )}

            {showRoleModal && selectedUserForRole && (
                <RoleManagement
                    user={selectedUserForRole}
                    isOpen={showRoleModal}
                    onClose={() => {
                        setShowRoleModal(false);
                        setSelectedUserForRole(null);
                    }}
                />
            )}
        </div>
    );
};

export default UserList;