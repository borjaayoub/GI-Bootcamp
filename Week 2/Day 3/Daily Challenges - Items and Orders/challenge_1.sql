-- Create the users table (Bonus requirement)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the product_orders table
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10,2) DEFAULT 0.00
);

-- Create the items table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES product_orders(order_id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    description TEXT
);

-- Insert sample data for testing
INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com'),
('bob_wilson', 'bob@example.com');

INSERT INTO product_orders (user_id, status) VALUES
(1, 'completed'),
(1, 'pending'),
(2, 'completed'),
(3, 'shipped');

INSERT INTO items (order_id, product_name, price, quantity, description) VALUES
(1, 'Laptop', 999.99, 1, 'High-performance laptop'),
(1, 'Mouse', 29.99, 2, 'Wireless mouse'),
(2, 'Keyboard', 89.99, 1, 'Mechanical keyboard'),
(3, 'Monitor', 299.99, 1, '27-inch 4K monitor'),
(3, 'Headphones', 149.99, 1, 'Noise-cancelling headphones'),
(4, 'Tablet', 399.99, 1, '10-inch tablet');

-- Function to calculate total price for a given order
CREATE OR REPLACE FUNCTION get_order_total(order_id_param INTEGER)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2) := 0;
BEGIN
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total
    FROM items
    WHERE order_id = order_id_param;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate total price for a given order of a given user (Bonus)
CREATE OR REPLACE FUNCTION get_user_order_total(user_id_param INTEGER, order_id_param INTEGER)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2) := 0;
    order_exists BOOLEAN := FALSE;
BEGIN
    -- Check if the order belongs to the specified user
    SELECT EXISTS(
      SELECT 1 FROM product_orders 
      WHERE order_id = order_id_param AND user_id = user_id_param
    ) INTO order_exists;
    
    IF NOT order_exists THEN
      RETURN 0; -- Return 0 if order doesn't belong to user
    END IF;
    
    -- Calculate total for the order
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total
    FROM items
    WHERE order_id = order_id_param;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Get total for order 1
SELECT get_order_total(1) AS "Total for Order 1";

-- Get total for order 1 of user 1
SELECT get_user_order_total(1, 1) AS "Total for User 1, Order 1";

-- Get total for order 1 of user 2 (should return 0 as order 1 belongs to user 1)
SELECT get_user_order_total(2, 1) AS "Total for User 2, Order 1";

-- Show all orders with their totals
SELECT 
    po.order_id,
    u.username,
    po.order_date,
    po.status,
    get_order_total(po.order_id) AS total_amount
FROM product_orders po
JOIN users u ON po.user_id = u.user_id
ORDER BY po.order_id;
