CREATE TABLE customer_1 (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);


CREATE TABLE customer_profile(
    id SERIAL PRIMARY KEY,
    isLoggedIn boolean default false,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer_1(id)
);

INSERT INTO customer_1 (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');


INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES
    (true,  (SELECT id FROM customer_1 WHERE first_name = 'John' AND last_name = 'Doe')),
    (false, (SELECT id FROM customer_1 WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

SELECT c.first_name FROM customer_1 c
JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = true;

SELECT c.first_name, cp.isLoggedIn 
FROM customer_1 c
LEFT JOIN customer_profile cp ON c.id = cp.customer_id;

SELECT count(*) AS total_customers
FROM customer_1 c
RIGHT JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = false;