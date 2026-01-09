import React, { useState } from 'react';
import { X, Save, Mail, Phone, User as UserIcon } from 'lucide-react';
import type { User, Address } from '../../types/user';
import { UserStatus } from '../../types/user';
import { useUserStore } from '../../stores/userStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface UserEditModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    user,
    isOpen,
    onClose,
}) => {
    const { updateUser, isLoading } = useUserStore();
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        status: user.status,
    });

    const [billingAddress, setBillingAddress] = useState<Address>({
        streetAddress: user.billingAddress?.streetAddress || '',
        city: user.billingAddress?.city || '',
        state: user.billingAddress?.state || '',
        postalCode: user.billingAddress?.postalCode || '',
        country: user.billingAddress?.country || 'South Africa',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await updateUser(user.id, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone || undefined,
                status: formData.status,
                billingAddress: billingAddress.streetAddress ? billingAddress : undefined,
            });

            onClose();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <UserIcon size={20} className="text-primary-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Edit User</h3>
                            <p className="text-sm text-gray-600">{user.username}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Info */}
                    <div>
                        <h4 className="font-medium mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="John"
                                disabled={isLoading}
                            />

                            <Input
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Doe"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-medium mb-4">Contact Information</h4>
                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="you@example.com"
                                leftIcon={<Mail size={18} className="text-gray-400" />}
                                error={errors.email}
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="+27 00 000 0000"
                                leftIcon={<Phone size={18} className="text-gray-400" />}
                                error={errors.phone}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                        <h4 className="font-medium mb-4">Billing Address</h4>
                        <div className="space-y-4">
                            <Input
                                label="Street Address"
                                value={billingAddress.streetAddress || ''}
                                onChange={(e) => setBillingAddress(prev => ({ ...prev, streetAddress: e.target.value }))}
                                placeholder="123 Main Street"
                                disabled={isLoading}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="City"
                                    value={billingAddress.city || ''}
                                    onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                                    placeholder="Johannesburg"
                                    disabled={isLoading}
                                />

                                <Input
                                    label="State/Province"
                                    value={billingAddress.state || ''}
                                    onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                                    placeholder="Gauteng"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Postal Code"
                                    value={billingAddress.postalCode || ''}
                                    onChange={(e) => setBillingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                                    placeholder="2000"
                                    disabled={isLoading}
                                />

                                <Input
                                    label="Country"
                                    value={billingAddress.country || ''}
                                    onChange={(e) => setBillingAddress(prev => ({ ...prev, country: e.target.value }))}
                                    placeholder="South Africa"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="font-medium mb-4">Account Status</h4>
                        <div className="flex flex-wrap gap-3">
                            {Object.values(UserStatus).map((status) => (
                                <label
                                    key={status}
                                    className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${formData.status === status
                                            ? 'bg-primary-50 border-primary-500 text-primary-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={formData.status === status}
                                        onChange={(e) => handleChange('status', e.target.value)}
                                        className="sr-only"
                                        disabled={isLoading}
                                    />
                                    <span className="text-sm">{status.replace('_', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            leftIcon={<Save size={18} />}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;