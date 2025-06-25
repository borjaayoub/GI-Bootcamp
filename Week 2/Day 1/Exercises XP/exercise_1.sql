CREATE TABLE items (
    items_id SERIAL PRIMARY KEY,
    items_name VARCHAR(255) NOT NULL,
    items_price SmallInt NOT NULL
);

CREATE TABLE customers(
    customers_id SERIAL PRIMARY KEY,
    customers_firstName VARCHAR(255) NOT NULL,
    customers_lastName VARCHAR(255) NOT NULL
);



INSERT INTO items (items_name, items_price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

INSERT INTO customers (customers_firstName, customers_lastName) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');



SELECT * FROM items;

SELECT * FROM items WHERE items_price>80;

SELECT * FROM items WHERE items_price >= 300;

SELECT * FROM customers WHERE customers_lastname = 'Smith';

SELECT * FROM customers WHERE customers_lastname = 'Jones';

SELECT * FROM customers WHERE customers_firstName != 'Scott';