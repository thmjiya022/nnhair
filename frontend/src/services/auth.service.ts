import { supabase } from "../lib/supabase";
import { type UserProfile } from "../types/user-profile";

/**
 * Sign up a new user
 */
export const signUp = async (
    email: string,
    password: string,
    fullName: string
): Promise<{ user: any; error: any }> => {
    try {
        // 1️⃣ Sign up with Supabase Auth (dev-safe)
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/login', // dev-safe: skips actual email verification
            },
        });

        if (authError) throw authError;
        if (!data.user) throw new Error("Signup failed: no user returned");

        // 2️⃣ Insert into user_profiles table
        const { error: profileError } = await supabase.from("user_profiles").insert([
            {
                id: data.user.id, // must match auth.users.id
                email,
                full_name: fullName,
                role: "customer", // default role
            },
        ]);

        if (profileError) throw profileError;

        return { user: data.user, error: null };
    } catch (error: any) {
        console.error("Signup error:", error);
        return { user: null, error };
    }
};


/**
 * Sign in user
 */
export const signIn = async (
    email: string,
    password: string
): Promise<{ user: any; error: any }> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return { user: data.user, error: null };
    } catch (error: any) {
        console.error("Signin error:", error);
        return { user: null, error };
    }
};
/**
 * Sign out current user
 */
export const signOut = async (): Promise<{ error: any }> => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        console.error('Signout error:', error);
        return { error };
    }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

/**
 * Get current user's session
 */
export const getSession = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    } catch (error) {
        console.error('Get session error:', error);
        return null;
    }
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Get user profile error:', error);
        return null;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: Partial<UserProfile>
): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Update user profile error:', error);
        return null;
    }
};

/**
 * Check if user is admin
 */
export const isAdmin = async (userId: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data?.role === 'admin';
    } catch (error) {
        console.error('Check admin error:', error);
        return false;
    }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<{ error: any }> => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        console.error('Reset password error:', error);
        return { error };
    }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string): Promise<{ error: any }> => {
    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        console.error('Update password error:', error);
        return { error };
    }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session?.user ?? null);
    });
};