import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold text-white tracking-wider">N N HAIR</h1>
                </div>
                <h2 className="mt-2 text-center text-sm text-gray-400 tracking-widest">
                    BY NONTANDO
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-800">
                    <ForgotPasswordForm />

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-yellow-600 hover:text-yellow-500 font-medium"
                        >
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;