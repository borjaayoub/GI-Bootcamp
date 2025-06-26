SELECT * FROM customer;

SELECT (first_name || ' ' || last_name) AS full_name FROM customer;

SELECT create_date FROM customer;

SELECT * FROM customer ORDER BY first_name DESC;

SELECT film_id, title, description, release_year, rental_rate FROM film ORDER BY rental_rate ASC;

SELECT address, phone FROM address WHERE district = 'Texas';

SELECT * FROM film WHERE film_id = 15 OR film_id = 150;

SELECT film_id, title, description, length, rental_rate FROM film WHERE title = 'Inception';

SELECT film_id, title, description, length, rental_rate FROM film WHERE title LIKE 'In%';

SELECT * FROM film ORDER BY rental_rate ASC LIMIT 10;

SELECT * FROM film ORDER BY rental_rate ASC LIMIT 10 OFFSET 10;

SELECT * FROM film ORDER BY rental_rate ASC FETCH FIRST 10 ROW ONLY OFFSET 10;

SELECT customer.first_name, customer.last_name, payment.amount, payment.payment_date
FROM customer
INNER JOIN payment ON payment.customer_id = customer.customer_id
ORDER BY customer.customer_id;

SELECT * FROM film
LEFT JOIN inventory ON film.film_id = inventory.film_id
WHERE inventory.film_id IS NULL;

SELECT city.city, country.country
FROM city
INNER JOIN country ON city.country_id = country.country_id;

