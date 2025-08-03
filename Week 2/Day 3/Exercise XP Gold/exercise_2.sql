-- This shows how many stores there are and where they are located (city and country)
SELECT COUNT(*) AS total_stores,
  city,
  country
FROM store s
  JOIN address a ON s.address_id = a.address_id
  JOIN city c ON a.city_id = c.city_id
  JOIN country co ON c.country_id = co.country_id
GROUP BY city,
  country
ORDER BY total_stores DESC,
  city,
  country;
-- This represents total hours of viewing time available in each store (excluding unreturned DVDs)
SELECT s.store_id,
  c.city || ', ' || co.country AS store_location,
  ROUND(SUM(f.length) / 60.0, 2) AS total_viewing_hours,
  ROUND(SUM(f.length) / 1440.0, 2) AS total_viewing_days
FROM store s
  JOIN address a ON s.address_id = a.address_id
  JOIN city c ON a.city_id = c.city_id
  JOIN country co ON c.country_id = co.country_id
  JOIN inventory i ON s.store_id = i.store_id
  JOIN film f ON i.film_id = f.film_id
  LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NOT NULL
  OR r.rental_id IS NULL
GROUP BY s.store_id,
  c.city,
  co.country
ORDER BY total_viewing_hours DESC;
-- List of all customers in the cities where the stores are located
SELECT DISTINCT cu.customer_id,
  cu.first_name,
  cu.last_name,
  cu.email,
  c.city || ', ' || co.country AS customer_location
FROM customer cu
  JOIN address a ON cu.address_id = a.address_id
  JOIN city c ON a.city_id = c.city_id
  JOIN country co ON c.country_id = co.country_id
WHERE c.city IN (
    SELECT DISTINCT c2.city
    FROM store s2
      JOIN address a2 ON s2.address_id = a2.address_id
      JOIN city c2 ON a2.city_id = c2.city_id
  )
ORDER BY customer_location,
  cu.last_name,
  cu.first_name;
-- List of all customers in the countries where the stores are located
SELECT DISTINCT cu.customer_id,
  cu.first_name,
  cu.last_name,
  cu.email,
  co.country AS customer_country
FROM customer cu
  JOIN address a ON cu.address_id = a.address_id
  JOIN city c ON a.city_id = c.city_id
  JOIN country co ON c.country_id = co.country_id
WHERE co.country IN (
    SELECT DISTINCT co2.country
    FROM store s2
      JOIN address a2 ON s2.address_id = a2.address_id
      JOIN city c2 ON a2.city_id = c2.city_id
      JOIN country co2 ON c2.country_id = co2.country_id
  )
ORDER BY co.country,
  cu.last_name,
  cu.first_name;
-- Safe movie list (excluding horror and scary keywords) - Total viewing time
-- Using CHECK constraint approach with CTEs for better performance
WITH scary_keywords AS (
  SELECT unnest(
      ARRAY ['beast', 'monster', 'ghost', 'dead', 'zombie', 'undead']
    ) AS keyword
),
safe_movies AS (
  SELECT f.film_id,
    f.title,
    f.description,
    f.length
  FROM film f
  WHERE f.film_id NOT IN (
      SELECT DISTINCT fc.film_id
      FROM film_category fc
        JOIN category cat ON fc.category_id = cat.category_id
      WHERE cat.name = 'Horror'
    )
    AND NOT EXISTS (
      SELECT 1
      FROM scary_keywords sk
      WHERE LOWER(f.title) LIKE '%' || sk.keyword || '%'
        OR LOWER(f.description) LIKE '%' || sk.keyword || '%'
    )
)
SELECT 'Safe Movies' AS movie_category,
  COUNT(DISTINCT film_id) AS total_movies,
  SUM(length) AS total_minutes,
  ROUND(SUM(length) / 60.0, 2) AS total_hours,
  ROUND(SUM(length) / 1440.0, 2) AS total_days
FROM safe_movies;
-- General movie list (all movies) - Total viewing time
SELECT 'All Movies' AS movie_category,
  COUNT(DISTINCT f.film_id) AS total_movies,
  SUM(f.length) AS total_minutes,
  ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
  ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM film f;
-- Safe movie list with inventory (excluding unreturned DVDs) - Per store
WITH scary_keywords AS (
  SELECT unnest(
      ARRAY ['beast', 'monster', 'ghost', 'dead', 'zombie', 'undead']
    ) AS keyword
),
available_inventory AS (
  SELECT i.inventory_id,
    i.store_id,
    i.film_id
  FROM inventory i
    LEFT JOIN rental r ON i.inventory_id = r.inventory_id
  WHERE r.return_date IS NOT NULL
    OR r.rental_id IS NULL
),
safe_movies AS (
  SELECT f.film_id,
    f.title,
    f.description,
    f.length
  FROM film f
  WHERE f.film_id NOT IN (
      SELECT DISTINCT fc.film_id
      FROM film_category fc
        JOIN category cat ON fc.category_id = cat.category_id
      WHERE cat.name = 'Horror'
    )
    AND NOT EXISTS (
      SELECT 1
      FROM scary_keywords sk
      WHERE LOWER(f.title) LIKE '%' || sk.keyword || '%'
        OR LOWER(f.description) LIKE '%' || sk.keyword || '%'
    )
)
SELECT s.store_id,
  c.city || ', ' || co.country AS store_location,
  COUNT(DISTINCT f.film_id) AS safe_movies_count,
  SUM(f.length) AS safe_total_minutes,
  ROUND(SUM(f.length) / 60.0, 2) AS safe_total_hours,
  ROUND(SUM(f.length) / 1440.0, 2) AS safe_total_days
FROM store s
  JOIN address a ON s.address_id = a.address_id
  JOIN city c ON a.city_id = c.city_id
  JOIN country co ON c.country_id = co.country_id
  JOIN available_inventory ai ON s.store_id = ai.store_id
  JOIN safe_movies f ON ai.film_id = f.film_id
GROUP BY s.store_id,
  c.city,
  co.country
ORDER BY safe_total_hours DESC;