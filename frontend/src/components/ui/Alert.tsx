import React from 'react';
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: React.ReactNode;
    onClose?: () => void;
    className?: string;
}

const Alert: React.FC<AlertProps> = ({
    variant = 'info',
    title,
    children,
    onClose,
    className = '',
}) => {
    const variants = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: <Info className="h-5 w-5 text-blue-400" />,
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: <CheckCircle className="h-5 w-5 text-green-400" />,
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        },
    };

    const currentVariant = variants[variant];

    return (
        <div
            className={`rounded-lg border p-4 ${currentVariant.bg} ${currentVariant.border} ${className}`}
            role="alert"
        >
            <div className="flex">
                <div className="flex-shrink-0">{currentVariant.icon}</div>
                <div className="ml-3 flex-1">
                    {title && (
                        <h3 className={`text-sm font-medium ${currentVariant.text}`}>
                            {title}
                        </h3>
                    )}
                    <div className={`text-sm ${currentVariant.text} ${title ? 'mt-2' : ''}`}>
                        {children}
                    </div>
                </div>
                {onClose && (
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                onClick={onClose}
                                className={`inline-flex rounded-md p-1.5 ${currentVariant.text} hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${variant}-50 focus:ring-${variant}-600`}
                            >
                                <span className="sr-only">Dismiss</span>
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alert;