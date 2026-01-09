import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../stores/authStore';

const Login: React.FC = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

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
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;