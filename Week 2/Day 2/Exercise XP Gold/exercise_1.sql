-- Find out how many films there are for each rating
SELECT rating,
  COUNT(*) as film_count
FROM film
GROUP BY rating
ORDER BY rating;

-- Get a list of all movies with rating G or PG-13, under 2 hours, rental_rate under 3.00, sorted alphabetically
SELECT title,
  rating,
  length,
  rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title;

-- Find a customer and change their details to your details
SELECT customer_id,
  first_name,
  last_name,
  email
FROM customer
LIMIT 5;
-- Update customer details
UPDATE customer
SET first_name = 'Ayoub',
  last_name = 'Borja',
  email = 'ayoub.borja@gmail.com'
WHERE customer_id = 1;

-- Find the customer's address and update it
SELECT c.customer_id,
  c.first_name,
  c.last_name,
  a.address,
  ci.city,
  a.postal_code
FROM customer c
  JOIN address a ON c.address_id = a.address_id
  JOIN city ci ON a.city_id = ci.city_id
WHERE c.customer_id = 1;

-- Update the address
UPDATE address
SET city_id = (
    SELECT city_id
    FROM city
    WHERE city = 'Barcelona'
  )
WHERE address_id = 1;

-- Check the update
SELECT c.customer_id,
  c.first_name,
  c.last_name,
  a.address,
  ci.city,
  a.postal_code
FROM customer c
  JOIN address a ON c.address_id = a.address_id
  JOIN city ci ON a.city_id = ci.city_id
WHERE c.customer_id = 1;