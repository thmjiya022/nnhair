import React, { useState, useEffect } from 'react';
import { X, Shield, UserPlus } from 'lucide-react';
import type { User, UserRole } from '../../types/user';
import { useUserStore } from '../../stores/userStore';
import Button from '../ui/Button';

interface RoleManagementProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({
    user,
    isOpen,
    onClose,
}) => {
    const { roles, assignRole, removeRole, loadRoles } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
    const [userRoles, setUserRoles] = useState<UserRole[]>(user.roles || []);

    useEffect(() => {
        loadRoles();
    }, []);

    useEffect(() => {
        if (roles.length > 0) {
            // Filter out roles the user already has
            const filtered = roles.filter(
                role => !userRoles.some(userRole => userRole.id === role.id)
            );
            setAvailableRoles(filtered);
        }
    }, [roles, userRoles]);

    const handleAssignRole = async (role: UserRole) => {
        setIsLoading(true);
        try {
            await assignRole(user.id, role.id);
            setUserRoles([...userRoles, role]);
            setAvailableRoles(availableRoles.filter(r => r.id !== role.id));
        } catch (error) {
            console.error('Failed to assign role:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveRole = async (role: UserRole) => {
        setIsLoading(true);
        try {
            await removeRole(user.id, role.id);
            setUserRoles(userRoles.filter(r => r.id !== role.id));
            setAvailableRoles([...availableRoles, role]);
        } catch (error) {
            console.error('Failed to remove role:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Shield size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Manage Roles</h3>
                            <p className="text-sm text-gray-600">{user.fullName || user.username}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Current Roles */}
                <div className="p-6 border-b">
                    <h4 className="font-medium mb-4">Current Roles</h4>
                    {userRoles.length === 0 ? (
                        <p className="text-gray-500 text-sm">No roles assigned</p>
                    ) : (
                        <div className="space-y-2">
                            {userRoles.map((role) => (
                                <div
                                    key={role.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <span className="font-medium">{role.roleName}</span>
                                        {role.description && (
                                            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveRole(role)}
                                        disabled={isLoading || role.isSystemRole}
                                        className={`px-3 py-1 text-sm rounded ${role.isSystemRole
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                                            }`}
                                        title={role.isSystemRole ? 'System roles cannot be removed' : 'Remove role'}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Available Roles */}
                <div className="p-6">
                    <h4 className="font-medium mb-4">Available Roles</h4>
                    {availableRoles.length === 0 ? (
                        <p className="text-gray-500 text-sm">No additional roles available</p>
                    ) : (
                        <div className="space-y-2">
                            {availableRoles.map((role) => (
                                <div
                                    key={role.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <span className="font-medium">{role.roleName}</span>
                                        {role.description && (
                                            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleAssignRole(role)}
                                        disabled={isLoading}
                                        className="flex items-center px-3 py-1 text-sm bg-primary-50 text-primary-600 hover:bg-primary-100 rounded"
                                    >
                                        <UserPlus size={14} className="mr-1" />
                                        Assign
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-6 border-t">
                    <Button
                        type="button"
                        variant="primary"
                        className="w-full"
                        onClick={onClose}
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;