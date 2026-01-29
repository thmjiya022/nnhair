import { supabase, handleSupabaseError } from "../lib/supabase";
import { type ContactMessage } from "../types/contact-message";

/**
 * Create a new contact message
 */
export const createContactMessage = async (
    messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>
): Promise<ContactMessage | null> => {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([{
                ...messageData,
                status: 'new',
            }])
            .select()
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error creating contact message:', error);
        throw error;
    }
};

/**
 * Get all contact messages (Admin only)
 */
export const getMessages = async (): Promise<ContactMessage[]> => {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            handleSupabaseError(error);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return [];
    }
};

/**
 * Update contact message status (Admin only)
 */
export const updateMessageStatus = async (
    id: string,
    status: string
): Promise<ContactMessage | null> => {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            handleSupabaseError(error);
        }

        return data;
    } catch (error) {
        console.error('Error updating message status:', error);
        return null;
    }
};

/**
 * Delete a contact message (Admin only)
 */
export const deleteMessage = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (error) {
            handleSupabaseError(error);
        }

        return true;
    } catch (error) {
        console.error('Error deleting message:', error);
        return false;
    }
};