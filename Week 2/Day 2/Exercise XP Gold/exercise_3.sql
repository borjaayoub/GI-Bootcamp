CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER,
  item_id INTEGER,
  quantity_purchased INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customers(customers_id),
  FOREIGN KEY (item_id) REFERENCES items(items_id)
);

-- Insert purchases using subqueries
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES 
  (
    (SELECT customers_id FROM customers WHERE customers_firstName = 'Scott' AND customers_lastName = 'Scott'),
    (SELECT items_id FROM items WHERE items_name = 'Fan'),
    1
  ),
  (
    (SELECT customers_id FROM customers WHERE customers_firstName = 'Melanie' AND customers_lastName = 'Johnson'),
    (SELECT items_id FROM items WHERE items_name = 'Large Desk'),
    10
  ),
  (
    (SELECT customers_id FROM customers WHERE customers_firstName = 'Greg' AND customers_lastName = 'Jones'),
    (SELECT items_id FROM items WHERE items_name = 'Small Desk'),
    2
  );

-- 1. All purchases. Is this information useful to us?
SELECT * FROM purchases;
-- This information is useful as it shows all purchase transactions, but it's limited 
-- because we can't see customer names or item details without joining other tables.

-- 2. All purchases, joining with the customers table
SELECT 
    p.id as purchase_id,
    p.quantity_purchased,
    c.customers_id,
    c.customers_firstName,
    c.customers_lastName
FROM purchases p
JOIN customers c ON p.customer_id = c.customers_id;

-- 3. Purchases of the customer with the ID equal to 5
SELECT 
    p.id as purchase_id,
    p.quantity_purchased,
    c.customers_id,
    c.customers_firstName,
    c.customers_lastName
FROM purchases p
JOIN customers c ON p.customer_id = c.customers_id
WHERE c.customers_id = 5;

-- 4. Purchases for a large desk AND a small desk
SELECT 
    p.id as purchase_id,
    p.quantity_purchased,
    c.customers_firstName,
    c.customers_lastName,
    i.items_name,
    i.items_price
FROM purchases p
JOIN customers c ON p.customer_id = c.customers_id
JOIN items i ON p.item_id = i.items_id
WHERE i.items_name IN ('Large Desk', 'Small Desk');

-- 5. Show all customers who have made a purchase
SELECT 
    c.customers_firstName,
    c.customers_lastName,
    i.items_name
FROM purchases p
JOIN customers c ON p.customer_id = c.customers_id
JOIN items i ON p.item_id = i.items_id
ORDER BY c.customers_lastName, c.customers_firstName;

-- Test: Add a row with customer_id but NULL item_id
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);
-- This will likely fail because:
-- 1. The item_id column has a FOREIGN KEY constraint referencing items(items_id)
-- 2. NULL values are typically not allowed in foreign key columns unless explicitly permitted
-- 3. The database will reject this insert to maintain referential integrity
