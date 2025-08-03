-- Part 1: Retrieve all films with G or PG rating that are not currently rented

SELECT 
    f.film_id,
    f.title,
    f.rating,
    f.description,
    f.release_year,
    f.rental_rate
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id 
    AND r.return_date IS NULL  -- Currently rented (not returned)
WHERE f.rating IN ('G', 'PG')
    AND r.rental_id IS NULL  -- Not currently rented
ORDER BY f.title;

-- Alternative approach using NOT EXISTS
SELECT 
    f.film_id,
    f.title,
    f.rating,
    f.description,
    f.release_year,
    f.rental_rate
FROM film f
WHERE f.rating IN ('G', 'PG')
    AND NOT EXISTS (
        SELECT 1 
        FROM inventory i 
        JOIN rental r ON i.inventory_id = r.inventory_id
        WHERE i.film_id = f.film_id 
            AND r.return_date IS NULL
    )
ORDER BY f.title;

-- Part 2: Create waiting list table for children's movies

-- Create the waiting list table
CREATE TABLE children_movie_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    parent_contact VARCHAR(100),
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'completed')),
    FOREIGN KEY (film_id) REFERENCES film(film_id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_waiting_list_film_id ON children_movie_waiting_list(film_id);
CREATE INDEX idx_waiting_list_status ON children_movie_waiting_list(status);

-- Test data: Add some sample entries to the waiting list
INSERT INTO children_movie_waiting_list (film_id, child_name, parent_contact) VALUES
(1, 'Emma Johnson', 'emma.parent@email.com'),
(1, 'Lucas Smith', 'lucas.parent@email.com'),
(2, 'Sophia Davis', 'sophia.parent@email.com'),
(3, 'Noah Wilson', 'noah.parent@email.com'),
(1, 'Olivia Brown', 'olivia.parent@email.com'),
(4, 'William Taylor', 'william.parent@email.com'),
(2, 'Ava Martinez', 'ava.parent@email.com'),
(5, 'James Anderson', 'james.parent@email.com');

-- Part 3: Retrieve number of people waiting for each children's DVD

-- Query to get waiting list statistics
SELECT 
    f.film_id,
    f.title,
    f.rating,
    COUNT(wl.waiting_id) AS people_waiting,
    COUNT(CASE WHEN wl.status = 'waiting' THEN 1 END) AS active_waiting,
    COUNT(CASE WHEN wl.status = 'notified' THEN 1 END) AS notified_count,
    COUNT(CASE WHEN wl.status = 'completed' THEN 1 END) AS completed_count
FROM film f
LEFT JOIN children_movie_waiting_list wl ON f.film_id = wl.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
HAVING COUNT(wl.waiting_id) > 0
ORDER BY people_waiting DESC, f.title;

-- Query to see the test data
SELECT 
    f.title,
    wl.child_name,
    wl.parent_contact,
    wl.request_date,
    wl.status
FROM children_movie_waiting_list wl
JOIN film f ON wl.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
ORDER BY f.title, wl.request_date;

-- Final query showing waiting list statistics with test data
SELECT 
    f.film_id,
    f.title,
    f.rating,
    COUNT(wl.waiting_id) AS people_waiting,
    COUNT(CASE WHEN wl.status = 'waiting' THEN 1 END) AS active_waiting,
    COUNT(CASE WHEN wl.status = 'notified' THEN 1 END) AS notified_count,
    COUNT(CASE WHEN wl.status = 'completed' THEN 1 END) AS completed_count
FROM film f
LEFT JOIN children_movie_waiting_list wl ON f.film_id = wl.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
HAVING COUNT(wl.waiting_id) > 0
ORDER BY people_waiting DESC, f.title;
