import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
    label?: string;
    error?: string;
    helpText?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    helpText,
    required,
    children,
    className = '',
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div>
                {children}

                {error && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{error}</span>
                    </div>
                )}

                {helpText && !error && (
                    <p className="mt-2 text-sm text-gray-500">{helpText}</p>
                )}
            </div>
        </div>
    );
};

export default FormField;