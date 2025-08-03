-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude 'id' from the results.
SELECT customers_firstName, customers_lastName
FROM customers
ORDER BY customers_firstName, customers_lastName
LIMIT 2;

-- 2. Use SQL to delete all purchases made by Scott.
DELETE FROM purchases 
WHERE customer_id = (SELECT customers_id FROM customers WHERE customers_firstName = 'Scott' AND customers_lastName = 'Scott');

-- 3. Does Scott still exist in the customers table, even though he has been deleted.
SELECT * FROM customers WHERE customers_firstName = 'Scott' AND customers_lastName = 'Scott';
-- Yes, Scott still exists in the customers table because we only deleted his purchases, not his customer record.

-- 4. Use SQL to find all purchases. Join purchases with the customers table, so that Scott's order will appear, 
--    although instead of the customer's first and last name, you should only see empty/blank.
SELECT 
    p.id as purchase_id,
    p.quantity_purchased,
    c.customers_firstName,
    c.customers_lastName
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.customers_id;
-- We use LEFT JOIN because we want all purchases (left table) even if there's no matching customer (right table)
-- Since Scott's purchases were deleted, this won't show Scott's orders, but if there were orphaned purchases, they would show with NULL customer names

-- 5. Use SQL to find all purchases. Join purchases with the customers table, so that Scott's order will NOT appear. 
--    (Which kind of join should you use?)
SELECT 
    p.id as purchase_id,
    p.quantity_purchased,
    c.customers_firstName,
    c.customers_lastName
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.customers_id;
-- We use INNER JOIN because we only want purchases that have matching customer records
-- This will exclude any orphaned purchases that don't have corresponding customer records
