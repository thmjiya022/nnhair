import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/auth.service';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await resetPassword(email);
            if (error) {
                setError(error.message || 'Failed to send reset email');
                setLoading(false);
                return;
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="max-w-md mx-auto px-6 py-16">
                    <div className="bg-neutral-900 border border-neutral-800 p-12 text-center">
                        <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
                        </div>
                        <h2 className="text-3xl font-light mb-4 text-white">Check Your Email</h2>
                        <p className="text-neutral-400 mb-6">
                            We've sent password reset instructions to <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-neutral-500 mb-8">
                            Please check your inbox and follow the link to reset your password.
                        </p>
                        <Link to="/login">
                            <button className="w-full bg-[#d4af37] hover:bg-white text-black py-4 text-sm tracking-widest uppercase transition-colors">
                                Back to Login
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="bg-neutral-900 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Reset Password</span>
                    <h1 className="text-4xl md:text-6xl font-light mt-4 tracking-wide text-white">Forgot Password</h1>
                </div>
            </div>

            <div className="max-w-md mx-auto px-6 py-16">
                <div className="bg-neutral-900 border border-neutral-800 p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <p className="text-neutral-400 mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d4af37] hover:bg-white text-black py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-400">
                            Remember your password?{' '}
                            <Link to="/login" className="text-[#d4af37] hover:text-white transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ForgotPassword;