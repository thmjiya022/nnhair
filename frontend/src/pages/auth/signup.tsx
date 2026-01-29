import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../services/auth.service';
import { Mail, Lock, User, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validatePassword = (password: string): string[] => {
        const errors = [];
        if (password.length < 8) errors.push('At least 8 characters');
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
        if (!/[0-9]/.test(password)) errors.push('One number');
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            setError(`Password must contain: ${passwordErrors.join(', ')}`);
            return;
        }

        setLoading(true);

        try {
            const { user, error } = await signUp(
                formData.email,
                formData.password,
                formData.fullName
            );

            if (error) {
                setError(error.message || 'Failed to create account');
                setLoading(false);
                return;
            }

            if (user) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login?signup=success');
                }, 2000);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <div className="bg-neutral-900 border border-neutral-800 p-12">
                        <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
                        </div>
                        <h2 className="text-3xl font-light mb-4 text-white">Account Created!</h2>
                        <p className="text-neutral-400 mb-6">
                            Please check your email to verify your account.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Redirecting to login...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Join Us</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Create Account</h1>
                </div>
            </div>

            <div className="max-w-md mx-auto px-6 py-16">
                <div className="bg-neutral-900 border border-neutral-800 p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-neutral-400 text-sm flex items-center gap-2 mb-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm flex items-center gap-2 mb-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">
                                Must be 8+ characters with uppercase, lowercase, and number
                            </p>
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm flex items-center gap-2 mb-2">
                                <Lock className="w-4 h-4" />
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className="text-sm">
                            <label className="flex items-start gap-3 text-neutral-400">
                                <input type="checkbox" required className="mt-1 rounded" />
                                <span>
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-[#d4af37] hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-[#d4af37] hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d4af37] hover:bg-white text-black py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#d4af37] hover:text-white transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SignUp;