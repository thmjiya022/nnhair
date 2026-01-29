import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../services/auth.service';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user, error } = await signIn(email, password);

            if (error) {
                setError(error.message || 'Invalid email or password');
                setLoading(false);
                return;
            }

            if (user) {
                // Redirect to appropriate page
                const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
                navigate(returnUrl || '/account');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Welcome Back</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Sign In</h1>
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
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#d4af37] transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-neutral-400">
                                <input type="checkbox" className="rounded" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-[#d4af37] hover:text-white transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d4af37] hover:bg-white text-black py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#d4af37] hover:text-white transition-colors">
                                Sign up
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

export default Login;