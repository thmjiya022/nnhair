import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ResetPasswordForm: React.FC = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 2000);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    if (submitted) {
        return (
            <div>
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Password Reset Successful</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Your password has been successfully reset. You can now sign in with your new password.
                    </p>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate('/login')}
                >
                    Continue to Login
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">Create New Password</h2>
                <p className="text-gray-400 text-sm">
                    Your new password must be different from previously used passwords.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="At least 6 characters"
                    leftIcon={<Lock size={18} className="text-gray-500" />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                    error={errors.password}
                    required
                    disabled={isLoading}
                />

                <Input
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    leftIcon={<Lock size={18} className="text-gray-500" />}
                    error={errors.confirmPassword}
                    required
                    disabled={isLoading}
                />

                <div className="bg-neutral-800 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
                    <ul className="text-xs text-gray-400 space-y-1 ml-4">
                        <li>• At least 6 characters</li>
                        <li>• Mix of letters and numbers recommended</li>
                        <li>• At least one special character recommended</li>
                    </ul>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;