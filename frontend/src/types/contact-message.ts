export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}