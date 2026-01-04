-- ============================================
-- Create Database
-- ============================================
USE master;
GO

-- Drop database if exists (for development)
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'nnhair_db')
BEGIN
    ALTER DATABASE nnhair_db SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE nnhair_db;
END
GO

-- Create new database
CREATE DATABASE nnhair_db;
GO

USE nnhair_db;
GO

-- Set recovery model to Simple (for development)
ALTER DATABASE nnhair_db SET RECOVERY SIMPLE;
GO

-- ============================================
-- Create Tables Based on Your JPA Entities
-- ============================================

-- Table: USERS (from User entity)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    -- User fields
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    status VARCHAR(20) CHECK (status IN ('ACTIVE','INACTIVE','SUSPENDED','PENDING_VERIFICATION','DELETED')),
    is_email_verified BIT DEFAULT 0,
    is_phone_verified BIT DEFAULT 0,
    last_login DATETIME2(6),
    failed_login_attempts INT DEFAULT 0,
    account_locked_until DATETIME2(6),
    
    -- Billing Address columns
    billing_city VARCHAR(255),
    billing_country VARCHAR(255),
    billing_is_default BIT,
    billing_postal_code VARCHAR(255),
    billing_state VARCHAR(255),
    street_address VARCHAR(255),
    
    -- Shipping Address columns
    shipping_city VARCHAR(255),
    shipping_country VARCHAR(255),
    shipping_is_default BIT,
    shipping_postal_code VARCHAR(255),
    shipping_state VARCHAR(255),
    shipping_street VARCHAR(255)
);
GO

-- Table: ROLES (from UserRole entity)
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);
GO

-- Table: ROLE_PERMISSIONS (collection table)
CREATE TABLE role_permissions (
    role_id VARCHAR(36) NOT NULL,
    permission VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
GO

-- Table: USER_ROLES (join table for many-to-many)
CREATE TABLE user_roles (
    user_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
GO

-- Table: PRODUCT (from Product entity - uses IDENTITY for auto-increment)
CREATE TABLE product (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    category VARCHAR(50) NOT NULL CHECK (category IN ('FRONTAL_WIGS','CLOSURE_WIGS','FULL_LACE_WIGS','BUNDLES','CLOSURES','FRONTALS','ACCESSORIES','HEADBAND_WIGS','PONYTAILS','BRAZILIAN_HAIR','PERUVIAN_HAIR','MALAYSIAN_HAIR','CUSTOM_WIGS')),
    texture VARCHAR(50) NOT NULL CHECK (texture IN ('STRAIGHT','BODY_WAVE','DEEP_WAVE','KINKY_STRAIGHT','WATER_WAVE','CURLY','KINKY_CURLY','NATURAL_CURLY','LOOSE_WAVE','TIGHT_CURLY')),
    stock_quantity INT NOT NULL,
    sku VARCHAR(100),
    weight NUMERIC(6,2),
    length NUMERIC(6,2),
    material VARCHAR(100),
    is_featured BIT,
    is_active BIT,
    created_at DATETIME2(6),
    updated_at DATETIME2(6)
);
GO

-- Create unique filtered index for SKU (not null unique)
CREATE UNIQUE NONCLUSTERED INDEX UK_product_sku 
    ON product(sku) WHERE sku IS NOT NULL;
GO

-- Table: PRODUCT_IMAGE (for product images collection)
CREATE TABLE product_image (
    product_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    PRIMARY KEY (product_id, image_url),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
GO

-- Table: PRODUCT_VARIANT
CREATE TABLE product_variant (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    product_id BIGINT NOT NULL,
    variant_name VARCHAR(100) NOT NULL,
    variant_type VARCHAR(50),
    variant_value VARCHAR(100),
    additional_price NUMERIC(10,2),
    stock_quantity INT,
    sku_suffix VARCHAR(50),
    barcode VARCHAR(100),
    is_active BIT,
    
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
GO

-- Table: CART
CREATE TABLE cart (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    user_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(100),
    subtotal NUMERIC(10,2),
    discount_amount NUMERIC(10,2),
    total_amount NUMERIC(10,2),
    item_count INT,
    is_active BIT,
    created_at DATETIME2(6),
    updated_at DATETIME2(6),
    expires_at DATETIME2(6)
);
GO

-- Table: CART_ITEM
CREATE TABLE cart_item (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    cart_id VARCHAR(36) NOT NULL,
    product_id BIGINT NOT NULL,
    variant_id VARCHAR(255),
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    image_url VARCHAR(500),
    
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
);
GO

-- Table: CUSTOMER_ORDER (from Order entity)
CREATE TABLE customer_order (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    customer_name VARCHAR(255),
    
    -- Shipping Address embedded
    apartment VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    delivery_instructions VARCHAR(500),
    postal_code VARCHAR(20) NOT NULL,
    state VARCHAR(100),
    street_address VARCHAR(255) NOT NULL,
    
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(10,2),
    discount_amount NUMERIC(10,2),
    total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'ZAR',
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING','PROCESSING','CONFIRMED','PREPARING','READY_FOR_SHIPPING','SHIPPED','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','REFUNDED','FAILED')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('CREDIT_CARD','DEBIT_CARD','BANK_TRANSFER','CASH_ON_DELIVERY','PAYPAL','PAYSTACK')),
    payment_status VARCHAR(50) CHECK (payment_status IN ('PENDING','AUTHORIZED','CAPTURED','PARTIALLY_REFUNDED','REFUNDED','FAILED','CANCELLED')),
    notes VARCHAR(1000),
    created_at DATETIME2(6),
    updated_at DATETIME2(6)
);
GO

-- Table: ORDER_ITEM
CREATE TABLE order_item (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    order_id VARCHAR(36) NOT NULL,
    product_id BIGINT NOT NULL,  -- Changed from VARCHAR(36) to BIGINT to match product.id
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    variant_id VARCHAR(36),
    variant_details VARCHAR(500),
    image_url VARCHAR(500),
    
    FOREIGN KEY (order_id) REFERENCES customer_order(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id)
);
GO

-- Table: ORDER_STATUS_HISTORY
CREATE TABLE order_status_history (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    order_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING','PROCESSING','CONFIRMED','PREPARING','READY_FOR_SHIPPING','SHIPPED','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','REFUNDED','FAILED')),
    notes VARCHAR(500),
    created_at DATETIME2(6) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES customer_order(id) ON DELETE CASCADE
);
GO

-- Table: PAYMENT
CREATE TABLE payment (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    order_id VARCHAR(255) NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('CREDIT_CARD','DEBIT_CARD','BANK_TRANSFER','EFT','PAYPAL','PAYSTACK','CASH_ON_DELIVERY')),
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('PENDING','AUTHORIZED','CAPTURED','PARTIALLY_CAPTURED','FAILED','CANCELLED','REFUNDED','PARTIALLY_REFUNDED','DISPUTED')),
    transaction_id VARCHAR(100),
    payment_gateway VARCHAR(50),
    gateway_response TEXT,
    failure_reason VARCHAR(500),
    paid_at DATETIME2(6),
    refunded_at DATETIME2(6),
    refund_amount NUMERIC(10,2),
    created_at DATETIME2(6),
    updated_at DATETIME2(6)
);
GO

-- Table: REVIEW
CREATE TABLE review (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    product_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    comment TEXT,
    status VARCHAR(20) CHECK (status IN ('PENDING','APPROVED','REJECTED','SPAM','DELETED')),
    is_verified_purchase BIT,
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    created_at DATETIME2(6),
    updated_at DATETIME2(6),
    approved_at DATETIME2(6),
    
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
GO

-- Table: WISHLIST
CREATE TABLE wishlist (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    is_private BIT,
    item_count INT,
    created_at DATETIME2(6),
    updated_at DATETIME2(6)
);
GO

-- Table: WISHLIST_ITEM
CREATE TABLE wishlist_item (
    id VARCHAR(36) PRIMARY KEY,
    version INT DEFAULT 0,
    created_by VARCHAR(50),
    created_date DATETIME2(6),
    updated_by VARCHAR(50),
    updated_date DATETIME2(6),
    
    wishlist_id VARCHAR(36) NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price NUMERIC(10,2),
    image_url VARCHAR(500),
    added_at DATETIME2(6),
    notes VARCHAR(500),
    
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
GO

-- ============================================
-- Create Indexes for Performance
-- ============================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_status ON users(status);

-- Product table indexes
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_texture ON product(texture);
CREATE INDEX idx_product_is_active ON product(is_active);
CREATE INDEX idx_product_is_featured ON product(is_featured);
CREATE INDEX idx_product_created_at ON product(created_at);

-- Order table indexes
CREATE INDEX idx_customer_order_user_id ON customer_order(user_id);
CREATE INDEX idx_customer_order_status ON customer_order(status);
CREATE INDEX idx_customer_order_payment_status ON customer_order(payment_status);
CREATE INDEX idx_customer_order_created_at ON customer_order(created_at);

-- Order Item indexes
CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_order_item_product_id ON order_item(product_id);

-- Cart indexes
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_cart_session_id ON cart(session_id);

-- Cart Item indexes
CREATE INDEX idx_cart_item_cart_id ON cart_item(cart_id);
CREATE INDEX idx_cart_item_product_id ON cart_item(product_id);

-- Wishlist indexes
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_is_private ON wishlist(is_private);

-- Review indexes
CREATE INDEX idx_review_product_id ON review(product_id);
CREATE INDEX idx_review_user_id ON review(user_id);
CREATE INDEX idx_review_status ON review(status);
CREATE INDEX idx_review_rating ON review(rating);

-- Payment indexes
CREATE INDEX idx_payment_order_id ON payment(order_id);
CREATE INDEX idx_payment_order_number ON payment(order_number);
CREATE INDEX idx_payment_user_id ON payment(user_id);
CREATE INDEX idx_payment_status ON payment(payment_status);
CREATE INDEX idx_payment_transaction_id ON payment(transaction_id);

-- ============================================
-- Insert Default Data
-- ============================================

-- Insert default roles
INSERT INTO roles (id, role_name, description) VALUES
(NEWID(), 'SUPER_ADMIN', 'Super Administrator with all permissions'),
(NEWID(), 'ADMIN', 'Administrator with full access'),
(NEWID(), 'USER', 'Regular user with limited access'),
(NEWID(), 'CUSTOMER', 'Customer role for shopping'),
(NEWID(), 'GUEST', 'Guest user with minimal permissions');
GO

-- Add some permissions to ADMIN role
DECLARE @adminRoleId VARCHAR(36);
SELECT @adminRoleId = id FROM roles WHERE role_name = 'ADMIN';

INSERT INTO role_permissions (role_id, permission) VALUES
(@adminRoleId, 'USER.READ'),
(@adminRoleId, 'USER.WRITE'),
(@adminRoleId, 'USER.DELETE'),
(@adminRoleId, 'PRODUCT.READ'),
(@adminRoleId, 'PRODUCT.WRITE'),
(@adminRoleId, 'PRODUCT.DELETE'),
(@adminRoleId, 'ORDER.READ'),
(@adminRoleId, 'ORDER.WRITE'),
(@adminRoleId, 'ORDER.DELETE'),
(@adminRoleId, 'PAYMENT.READ'),
(@adminRoleId, 'PAYMENT.WRITE');
GO

-- Insert admin user (password will be set by Spring Security)
DECLARE @adminRoleId VARCHAR(36);
SELECT @adminRoleId = id FROM roles WHERE role_name = 'ADMIN';

DECLARE @adminId VARCHAR(36) = NEWID();

INSERT INTO users (id, username, email, password_hash, first_name, last_name, status, is_email_verified)
VALUES (
    @adminId,
    'admin',
    'admin@nnhair.co.za',
    -- This will be overridden by Spring Security's BCryptPasswordEncoder
    '$2a$10$dummyhashfornowreplacewithrealbcrypt',
    'System',
    'Administrator',
    'ACTIVE',
    1
);

-- Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id) VALUES (@adminId, @adminRoleId);
GO

-- Insert sample products
INSERT INTO product (product_name, description, price, original_price, category, texture, stock_quantity, sku, weight, is_active, is_featured, created_at, updated_at)
VALUES
('Brazilian Straight Hair Bundle', '100% Brazilian Virgin Hair, 18 inches, Straight Texture', 2499.99, 2999.99, 'BRAZILIAN_HAIR', 'STRAIGHT', 50, 'NNH-BRA-ST-001', 300.00, 1, 1, GETDATE(), GETDATE()),
('Peruvian Body Wave Closure', '5x5 Closure with Peruvian Body Wave Hair', 1899.99, 2199.99, 'CLOSURE_WIGS', 'BODY_WAVE', 25, 'NNH-PER-BW-002', 250.00, 1, 1, GETDATE(), GETDATE()),
('Malaysian Deep Wave Frontal', '13x4 Frontal with Malaysian Deep Wave Hair', 3299.99, NULL, 'FRONTALS', 'DEEP_WAVE', 15, 'NNH-MAL-DW-003', 180.00, 1, 0, GETDATE(), GETDATE()),
('Custom Lace Front Wig', 'Custom-made lace front wig with natural hairline', 4599.99, 4999.99, 'CUSTOM_WIGS', 'KINKY_STRAIGHT', 10, 'NNH-CUS-KS-004', 350.00, 1, 1, GETDATE(), GETDATE());
GO

-- Insert product images for first product
DECLARE @productId BIGINT;
SELECT @productId = id FROM product WHERE sku = 'NNH-BRA-ST-001';

INSERT INTO product_image (product_id, image_url)
VALUES
(@productId, 'https://example.com/images/brazilian-straight-1.jpg'),
(@productId, 'https://example.com/images/brazilian-straight-2.jpg'),
(@productId, 'https://example.com/images/brazilian-straight-3.jpg');
GO

-- Insert product variants
DECLARE @productId2 BIGINT;
SELECT @productId2 = id FROM product WHERE sku = 'NNH-BRA-ST-001';

INSERT INTO product_variant (id, product_id, variant_name, variant_type, variant_value, additional_price, stock_quantity, sku_suffix, is_active)
VALUES
(NEWID(), @productId2, 'Length: 18 inches', 'LENGTH', '18 inches', 0.00, 20, '18IN', 1),
(NEWID(), @productId2, 'Length: 20 inches', 'LENGTH', '20 inches', 299.99, 15, '20IN', 1),
(NEWID(), @productId2, 'Length: 22 inches', 'LENGTH', '22 inches', 499.99, 10, '22IN', 1),
(NEWID(), @productId2, 'Bundle: 3 bundles', 'QUANTITY', '3 bundles', 0.00, 30, '3BUN', 1),
(NEWID(), @productId2, 'Bundle: 4 bundles', 'QUANTITY', '4 bundles', 799.99, 20, '4BUN', 1);
GO

-- ============================================
-- Create Stored Procedures
-- ============================================

-- Stored Procedure: Get User Orders
CREATE PROCEDURE sp_get_user_orders
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT 
        o.*,
        (SELECT COUNT(*) FROM order_item WHERE order_id = o.id) as item_count,
        (SELECT SUM(quantity) FROM order_item WHERE order_id = o.id) as total_quantity
    FROM customer_order o
    WHERE o.user_id = @user_id
    ORDER BY o.created_at DESC;
END
GO

-- Stored Procedure: Update Product Stock
CREATE PROCEDURE sp_update_product_stock
    @product_id BIGINT,
    @quantity_change INT
AS
BEGIN
    UPDATE product
    SET stock_quantity = stock_quantity + @quantity_change,
        updated_at = GETDATE()
    WHERE id = @product_id;
END
GO

-- Stored Procedure: Calculate Cart Totals
CREATE PROCEDURE sp_calculate_cart_totals
    @cart_id VARCHAR(36)
AS
BEGIN
    DECLARE @subtotal NUMERIC(10,2);
    DECLARE @item_count INT;
    
    SELECT 
        @subtotal = SUM(ci.unit_price * ci.quantity),
        @item_count = COUNT(*)
    FROM cart_item ci
    WHERE ci.cart_id = @cart_id;
    
    UPDATE cart
    SET subtotal = ISNULL(@subtotal, 0),
        item_count = ISNULL(@item_count, 0),
        total_amount = ISNULL(@subtotal, 0) - ISNULL(discount_amount, 0),
        updated_at = GETDATE()
    WHERE id = @cart_id;
END
GO

-- ============================================
-- Print Success Message
-- ============================================
PRINT '============================================';
PRINT 'Database nnhair_db created successfully!';
PRINT 'Tables created: 15';
PRINT 'Indexes created: 25';
PRINT 'Default roles inserted: 5';
PRINT 'Permissions added: 11';
PRINT 'Admin user created: admin@nnhair.co.za';
PRINT 'Sample products inserted: 4';
PRINT '============================================';
GO