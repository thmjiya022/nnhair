export const createPageUrl = (page: string): string => {
    const routes: Record<string, string> = {
        'Home': '/',
        'Catalog': '/catalog',
        'ProductDetail': '/product',
        'Cart': '/cart',
        'Checkout': '/checkout',
        'OrderSuccess': '/order-success',
        'About': '/about',
        'Contact': '/contact'
    };

    const basePath = routes[page] || '/';

    // Handle query parameters
    if (page.includes('?')) {
        const [pageName, query] = page.split('?');
        return `${routes[pageName] || '/'}?${query}`;
    }

    return basePath;
};