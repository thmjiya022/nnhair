import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Save } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { userService } from '../../services/user/userService';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ChangePasswordForm: React.FC = () => {
    const { user } = useAuthStore();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!passwords.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwords.newPassword || passwords.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccess(false);

        if (!validateForm()) return;
        if (!user) return;

        setIsLoading(true);

        try {
            await userService.changePassword(user.id, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });

            setSuccess(true);
            setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            setErrors({
                server: error.response?.data?.message || 'Failed to change password',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setPasswords((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Change Password</h3>
                <p className="text-gray-600 mt-1">Update your account password</p>
            </div>

            {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600">Password changed successfully!</p>
                </div>
            )}

            {errors.server && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.server}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Current Password"
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={(e) => handleChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, currentPassword: !prev.currentPassword }))}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {showPasswords.currentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                    error={errors.currentPassword}
                    required
                    disabled={isLoading}
                />

                <Input
                    label="New Password"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={(e) => handleChange('newPassword', e.target.value)}
                    placeholder="At least 6 characters"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {showPasswords.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                    error={errors.newPassword}
                    required
                    disabled={isLoading}
                />

                <Input
                    label="Confirm New Password"
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your new password"
                    leftIcon={<Lock size={18} className="text-gray-400" />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {showPasswords.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                    error={errors.confirmPassword}
                    required
                    disabled={isLoading}
                />

                <div className="pt-4 border-t">
                    <Button
                        type="submit"
                        variant="primary"
                        leftIcon={<Save size={18} />}
                        isLoading={isLoading}
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;