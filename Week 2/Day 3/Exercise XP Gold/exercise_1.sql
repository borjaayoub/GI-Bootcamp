-- Get all rentals that are out (not returned)
-- We identify films that are out by checking if return_date IS NULL
SELECT 
    r.rental_id,
    r.rental_date,
    r.return_date,
    f.title as film_title,
    c.first_name || ' ' || c.last_name as customer_name,
    s.first_name || ' ' || s.last_name as staff_name
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN staff s ON r.staff_id = s.staff_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date DESC;


-- Get all customers who have not returned their rentals
-- Results are grouped by customer
SELECT 
    c.customer_id,
    c.first_name || ' ' || c.last_name as customer_name,
    c.email,
    COUNT(r.rental_id) as outstanding_rentals,
    STRING_AGG(f.title, ', ' ORDER BY f.title) as rented_films,
    MIN(r.rental_date) as earliest_rental,
    MAX(r.rental_date) as latest_rental
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY outstanding_rentals DESC, customer_name;


-- Get all Action films with Joe Swank
SELECT 
    f.title,
    f.description,
    f.release_year,
    f.rating,
    f.rental_rate
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE a.first_name = 'Joe' 
    AND a.last_name = 'Swank'
    AND c.name = 'Action'
ORDER BY f.title;