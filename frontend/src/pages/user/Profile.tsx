import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Shield, Calendar } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import ProfileForm from '../../components/user/ProfileForm';
import AddressForm from '../../components/user/AddressForm';
import ChangePasswordForm from '../../components/user/ChangePasswordForm';
import Button from '../../components/ui/Button';

const Profile: React.FC = () => {
    const { user, isAuthenticated } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'address', label: 'Address', icon: MapPin },
        { id: 'password', label: 'Password', icon: Shield },
        { id: 'activity', label: 'Activity', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6 border-b">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User size={32} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{user.fullName || user.username}</h3>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                user.status === 'PENDING_VERIFICATION' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <nav className="p-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === tab.id
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <tab.icon size={20} />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Account Stats */}
                        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                            <h4 className="font-semibold mb-4">Account Info</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="font-medium">
                                        {user.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Last Login</span>
                                    <span className="font-medium">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Email Verified</span>
                                    <span className={`font-medium ${user.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.isEmailVerified ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Phone Verified</span>
                                    <span className={`font-medium ${user.isPhoneVerified ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.isPhoneVerified ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {activeTab === 'profile' && <ProfileForm user={user} />}
                            {activeTab === 'address' && <AddressForm user={user} />}
                            {activeTab === 'password' && <ChangePasswordForm />}
                            {activeTab === 'activity' && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Account Activity</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">Profile Updated</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Your profile information was updated
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {user.updatedDate ? new Date(user.updatedDate).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">Account Created</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Welcome to N N Hair! Your account was successfully created.
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {user.createdDate ? new Date(user.createdDate).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Roles Section */}
                        {user.roles && user.roles.length > 0 && (
                            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4">Your Roles</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.roles.map((role) => (
                                        <span
                                            key={role.id}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${role.roleName === 'ADMIN' || role.roleName === 'SUPER_ADMIN'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}
                                        >
                                            {role.roleName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;