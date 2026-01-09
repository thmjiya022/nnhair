import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import { UserStatus } from '../../types/user';
import type { User as UserType } from '../../types/user';

interface UserCardProps {
    user: UserType;
    onClick?: () => void;
    showActions?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onClick,
    showActions = false,
    onEdit,
    onDelete,
}) => {
    const getStatusColor = (status: UserStatus) => {
        switch (status) {
            case UserStatus.ACTIVE:
                return 'bg-green-100 text-green-800';
            case UserStatus.PENDING_VERIFICATION:
                return 'bg-yellow-100 text-yellow-800';
            case UserStatus.SUSPENDED:
                return 'bg-orange-100 text-orange-800';
            case UserStatus.DELETED:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {/* Header */}
            <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <User size={24} className="text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">
                                {user.fullName || user.username}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                                    {user.status.replace('_', ' ')}
                                </span>
                                {user.isAdmin && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                        Admin
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {showActions && (
                        <div className="flex space-x-2">
                            {onEdit && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit();
                                    }}
                                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
                                    title="Edit user"
                                >
                                    <Shield size={16} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="p-6">
                <div className="space-y-3">
                    <div className="flex items-center text-sm">
                        <Mail size={16} className="text-gray-400 mr-3" />
                        <span className="text-gray-600">{user.email}</span>
                    </div>

                    {user.phone && (
                        <div className="flex items-center text-sm">
                            <Phone size={16} className="text-gray-400 mr-3" />
                            <span className="text-gray-600">{user.phone}</span>
                        </div>
                    )}

                    {user.billingAddress?.city && (
                        <div className="flex items-start text-sm">
                            <MapPin size={16} className="text-gray-400 mr-3 mt-0.5" />
                            <span className="text-gray-600">
                                {user.billingAddress.city}, {user.billingAddress.country}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center text-sm">
                        <Calendar size={16} className="text-gray-400 mr-3" />
                        <span className="text-gray-600">
                            Joined {formatDate(user.createdDate)}
                        </span>
                    </div>
                </div>

                {/* Roles */}
                {user.roles && user.roles.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-wrap gap-2">
                            {user.roles.map((role) => (
                                <span
                                    key={role.id}
                                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                                >
                                    {role.roleName}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            {showActions && onDelete && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                    <div className="flex justify-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                            Delete User
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;