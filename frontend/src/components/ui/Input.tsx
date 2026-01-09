import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={clsx(
                            'w-full px-3 py-2.5 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition-colors text-white placeholder-gray-500',
                            {
                                'pl-10': leftIcon,
                                'pr-10': rightIcon,
                                'border-red-500 focus:ring-red-500': error,
                                'border-neutral-700': !error,
                            },
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(error || helperText) && (
                    <p className={clsx('mt-1 text-sm', error ? 'text-red-400' : 'text-gray-400')}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;