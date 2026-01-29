import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, isAdmin } from '../services/auth.service';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAdmin = false
}) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await getCurrentUser();

            if (!user) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            if (requireAdmin) {
                const admin = await isAdmin(user.id);
                setAuthorized(admin);
            } else {
                setAuthorized(true);
            }

            setLoading(false);
        };

        checkAuth();
    }, [requireAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;