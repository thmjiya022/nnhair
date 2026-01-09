import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAuthStore } from '../../stores/authStore';

const Register: React.FC = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white tracking-wider">N N HAIR</h1>
                    <p className="text-gray-400 mt-2 text-sm tracking-widest">BY NONTANDO</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;