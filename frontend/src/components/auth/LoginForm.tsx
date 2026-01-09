import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { login, isLoading, error, clearError } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) return;

        try {
            await login(formData.email, formData.password);
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            // Error is handled by the store
        }
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (typeof value === 'string' && errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-800">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Sign in to your account</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email Address"
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
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => handleChange('rememberMe', e.target.checked)}
                            className="h-4 w-4 text-yellow-600 focus:ring-yellow-600 border-neutral-700 bg-neutral-800 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-yellow-600 hover:text-yellow-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-yellow-600 hover:text-yellow-500"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;