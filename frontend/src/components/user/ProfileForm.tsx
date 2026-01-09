import React, { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import type { User as UserType } from '../../types/user';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ProfileFormProps {
    user: UserType;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    const { updateProfile, isLoading } = useAuthStore();
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

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
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone || undefined,
            });
        } catch (error) {
            // Error is handled by the store
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p className="text-gray-600 mt-1">Update your personal details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="John"
                        leftIcon={<User size={18} className="text-gray-400" />}
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

                <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    leftIcon={<Mail size={18} className="text-gray-400" />}
                    disabled
                    helperText="Contact support to change your email"
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+27 00 000 0000"
                    leftIcon={<Phone size={18} className="text-gray-400" />}
                    error={errors.phone}
                    helperText="Enter your phone number including country code"
                    disabled={isLoading}
                />

                <div className="pt-4 border-t">
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
    );
};

export default ProfileForm;