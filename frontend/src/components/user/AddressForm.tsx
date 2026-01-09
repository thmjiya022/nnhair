import React, { useState } from 'react';
import { MapPin, Home, Save, Globe } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import type { User as UserType, Address } from '../../types/user';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AddressFormProps {
    user: UserType;
}

const AddressForm: React.FC<AddressFormProps> = ({ user }) => {
    const { updateProfile, isLoading } = useAuthStore();

    const [billingAddress, setBillingAddress] = useState<Address>({
        streetAddress: user.billingAddress?.streetAddress || '',
        city: user.billingAddress?.city || '',
        state: user.billingAddress?.state || '',
        postalCode: user.billingAddress?.postalCode || '',
        country: user.billingAddress?.country || 'South Africa',
        isDefault: user.billingAddress?.isDefault || false,
    });

    const [shippingAddress, setShippingAddress] = useState<Address>({
        streetAddress: user.shippingAddress?.streetAddress || '',
        city: user.shippingAddress?.city || '',
        state: user.shippingAddress?.state || '',
        postalCode: user.shippingAddress?.postalCode || '',
        country: user.shippingAddress?.country || 'South Africa',
        isDefault: user.shippingAddress?.isDefault || false,
    });

    const [useSameAddress, setUseSameAddress] = useState(
        JSON.stringify(billingAddress) === JSON.stringify(shippingAddress)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const addresses = {
            billingAddress: billingAddress.streetAddress ? billingAddress : undefined,
            shippingAddress: useSameAddress
                ? billingAddress.streetAddress ? billingAddress : undefined
                : shippingAddress.streetAddress ? shippingAddress : undefined,
        };

        try {
            await updateProfile(addresses);
        } catch (error) {
            // Error is handled by the store
        }
    };

    const handleBillingChange = (field: keyof Address, value: string | boolean) => {
        setBillingAddress((prev) => ({ ...prev, [field]: value }));
        if (useSameAddress) {
            setShippingAddress((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleShippingChange = (field: keyof Address, value: string | boolean) => {
        setShippingAddress((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Address Information</h3>
                <p className="text-gray-600 mt-1">Manage your billing and shipping addresses</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Billing Address */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                        <Home size={20} className="text-gray-500 mr-2" />
                        <h4 className="font-semibold">Billing Address</h4>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Street Address"
                            value={billingAddress.streetAddress || ''}
                            onChange={(e) => handleBillingChange('streetAddress', e.target.value)}
                            placeholder="123 Main Street"
                            disabled={isLoading}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="City"
                                value={billingAddress.city || ''}
                                onChange={(e) => handleBillingChange('city', e.target.value)}
                                placeholder="Johannesburg"
                                disabled={isLoading}
                            />

                            <Input
                                label="State/Province"
                                value={billingAddress.state || ''}
                                onChange={(e) => handleBillingChange('state', e.target.value)}
                                placeholder="Gauteng"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Postal Code"
                                value={billingAddress.postalCode || ''}
                                onChange={(e) => handleBillingChange('postalCode', e.target.value)}
                                placeholder="2000"
                                disabled={isLoading}
                            />

                            <Input
                                label="Country"
                                value={billingAddress.country || ''}
                                onChange={(e) => handleBillingChange('country', e.target.value)}
                                leftIcon={<Globe size={18} className="text-gray-400" />}
                                disabled={isLoading}
                            />
                        </div>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={billingAddress.isDefault || false}
                                onChange={(e) => handleBillingChange('isDefault', e.target.checked)}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                disabled={isLoading}
                            />
                            <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                        </label>
                    </div>
                </div>

                {/* Same Address Toggle */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="sameAddress"
                        checked={useSameAddress}
                        onChange={(e) => {
                            setUseSameAddress(e.target.checked);
                            if (e.target.checked) {
                                setShippingAddress({ ...billingAddress });
                            }
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        disabled={isLoading}
                    />
                    <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-700">
                        Use same address for shipping
                    </label>
                </div>

                {/* Shipping Address */}
                {!useSameAddress && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <MapPin size={20} className="text-gray-500 mr-2" />
                            <h4 className="font-semibold">Shipping Address</h4>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Street Address"
                                value={shippingAddress.streetAddress || ''}
                                onChange={(e) => handleShippingChange('streetAddress', e.target.value)}
                                placeholder="123 Main Street"
                                disabled={isLoading}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="City"
                                    value={shippingAddress.city || ''}
                                    onChange={(e) => handleShippingChange('city', e.target.value)}
                                    placeholder="Johannesburg"
                                    disabled={isLoading}
                                />

                                <Input
                                    label="State/Province"
                                    value={shippingAddress.state || ''}
                                    onChange={(e) => handleShippingChange('state', e.target.value)}
                                    placeholder="Gauteng"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Postal Code"
                                    value={shippingAddress.postalCode || ''}
                                    onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                                    placeholder="2000"
                                    disabled={isLoading}
                                />

                                <Input
                                    label="Country"
                                    value={shippingAddress.country || ''}
                                    onChange={(e) => handleShippingChange('country', e.target.value)}
                                    leftIcon={<Globe size={18} className="text-gray-400" />}
                                    disabled={isLoading}
                                />
                            </div>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={shippingAddress.isDefault || false}
                                    onChange={(e) => handleShippingChange('isDefault', e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t">
                    <Button
                        type="submit"
                        variant="primary"
                        leftIcon={<Save size={18} />}
                        isLoading={isLoading}
                    >
                        Save Addresses
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;