import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail()) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 2000);
    };

    const handleChange = (value: string) => {
        setEmail(value);
        if (error) {
            setError('');
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
                    <h2 className="text-2xl font-semibold text-white mb-2">Check Your Email</h2>
                    <p className="text-gray-400 text-sm">
                        We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
                    </p>
                </div>

                <div className="bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-2">Didn't receive the email?</p>
                    <ul className="text-xs text-gray-400 space-y-1 ml-4">
                        <li>• Check your spam folder</li>
                        <li>• Verify the email address is correct</li>
                        <li>• Wait a few minutes and try again</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">Reset Password</h2>
                <p className="text-gray-400 text-sm">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="you@example.com"
                    leftIcon={<Mail size={18} className="text-gray-500" />}
                    error={error}
                    required
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Send Reset Link
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;