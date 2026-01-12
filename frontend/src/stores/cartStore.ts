import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    variant?: string;
    sku?: string;
    productId?: number;
    texture?: string;
    category?: string;
}

interface CartStore {
    items: CartItem[];

    // Basic Actions
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;

    // Helper Actions
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;

    // Getters
    getTotal: () => number;
    getItemCount: () => number;
    getItemById: (id: number) => CartItem | undefined;
    isInCart: (id: number) => boolean;
    getItemQuantity: (id: number) => number;

    // Update methods
    updateItemVariant: (id: number, variant: string) => void;

    // Calculations
    calculateSubtotal: () => number;
    calculateTax: () => number;
    calculateShipping: () => number;
    calculateTotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                    };
                });
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            incrementQuantity: (id) => {
                const currentQuantity = get().getItemQuantity(id);
                get().updateQuantity(id, currentQuantity + 1);
            },

            decrementQuantity: (id) => {
                const currentQuantity = get().getItemQuantity(id);
                if (currentQuantity > 1) {
                    get().updateQuantity(id, currentQuantity - 1);
                } else {
                    get().removeItem(id);
                }
            },

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            getItemById: (id) => {
                return get().items.find((item) => item.id === id);
            },

            isInCart: (id) => {
                return get().items.some((item) => item.id === id);
            },

            getItemQuantity: (id) => {
                const item = get().items.find((item) => item.id === id);
                return item ? item.quantity : 0;
            },

            updateItemVariant: (id, variant) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, variant } : item
                    ),
                }));
            },

            calculateSubtotal: () => {
                return get().getTotal();
            },

            calculateTax: () => {
                const subtotal = get().getTotal();
                return subtotal * 0.15;
            },

            calculateShipping: () => {
                const subtotal = get().getTotal();
                if (subtotal >= 1000) {
                    return 0;
                }
                return 150;
            },

            calculateTotal: () => {
                const subtotal = get().getTotal();
                const tax = get().calculateTax();
                const shipping = get().calculateShipping();
                return subtotal + tax + shipping;
            },
        }),
        {
            name: 'cart-storage',
            version: 1,
        }
    )
);

// The custom hook now uses the store methods
export const useCart = () => {
    const store = useCartStore();

    return {
        ...store,
        helpers: {
            formatPrice: (price: number): string => `R${price.toFixed(2)}`,
            calculateItemTotal: (item: CartItem): number => item.price * item.quantity,
            formatItemTotal: (item: CartItem): string => `R${(item.price * item.quantity).toFixed(2)}`,
        },
        summary: {
            subtotal: store.calculateSubtotal(),
            tax: store.calculateTax(),
            shipping: store.calculateShipping(),
            total: store.calculateTotal(),
            itemCount: store.getItemCount(),
            isFreeShipping: store.calculateShipping() === 0,
        },
    };
};