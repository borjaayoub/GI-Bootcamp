
UPDATE film SET language_id = (SELECT language_id FROM language WHERE name = 'German') WHERE film_id = 1;

SELECT * FROM film WHERE film_id = 1;

/*
the foreign keys defined in the customer table are: store_id, address_id.
when inserting a new customer, the store_id must reference an existing store in the store table,
and the address_id must reference an existing address in the address table.
*/;


--it's an easy step, it doesn't require any extra checking.
DROP TABLE customer_review;


SELECT COUNT(*) AS outstanding_rentals FROM rental WHERE return_date IS NULL;


SELECT f.film_id, f.title, f.rental_rate FROM film f
JOIN inventory inv ON f.film_id = inv.film_id
JOIN rental ren ON inv.inventory_id = ren.inventory_id
WHERE ren.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

SELECT * FROM film;

-- the 1st film
SELECT f.title FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo%'
    AND a.first_name = 'Penelope'
    AND a.last_name = 'Monroe';

-- the 2nd film
SELECT f.title FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.length < 60
    AND f.rating = 'R'
    AND c.name = 'Documentary';

-- the 3rd film
SELECT f.title FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
    AND c.last_name = 'Mahan'
    AND p.amount > 4.00
    AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- the 4th film
SELECT f.title, f.replacement_cost
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
    AND c.last_name = 'Mahan'
    AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;

