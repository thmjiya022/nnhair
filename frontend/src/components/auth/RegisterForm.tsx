import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { register, isLoading, error, clearError } = useAuthStore();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username || formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) return;

        try {
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone || undefined,
            };

            await register(userData);
            navigate('/login?registered=true');
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
        <div className="max-w-2xl w-full mx-auto p-6 bg-neutral-900 rounded-lg shadow-md border border-neutral-800">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-gray-400 mt-2">Join N N Hair community</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="John"
                        leftIcon={<User size={18} className="text-gray-500" />}
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
                    label="Username *"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="johndoe"
                    leftIcon={<User size={18} className="text-gray-500" />}
                    error={errors.username}
                    required
                    disabled={isLoading}
                />

                <Input
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    leftIcon={<Mail size={18} className="text-gray-500" />}
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
                    leftIcon={<Phone size={18} className="text-gray-500" />}
                    error={errors.phone}
                    disabled={isLoading}
                />

                <Input
                    label="Password *"
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
                    label="Confirm Password *"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    leftIcon={<Lock size={18} className="text-gray-500" />}
                    error={errors.confirmPassword}
                    required
                    disabled={isLoading}
                />

                <div className="text-sm text-gray-400 bg-neutral-800 p-4 rounded-lg">
                    <p className="mb-2">By creating an account, you agree to our:</p>
                    <ul className="space-y-1 ml-4">
                        <li>• Terms of Service</li>
                        <li>• Privacy Policy</li>
                        <li>• Return Policy</li>
                    </ul>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-yellow-600 hover:text-yellow-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;