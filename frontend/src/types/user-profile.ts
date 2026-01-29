export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    phone?: string;
    role: 'customer' | 'admin' | 'staff';
    avatar_url?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    province?: string;
    created_at?: string;
    updated_at?: string;
}