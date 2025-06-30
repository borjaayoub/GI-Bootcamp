SELECT name as All_languages FROM language;
SELECT language_id FROM film;
SELECT * FROM film;

SELECT film.title, film.description, language.name as language_name FROM film
INNER JOIN language ON film.language_id = language.language_id;

SELECT film.title, film.description, language.name as language_name FROM film
RIGHT OUTER JOIN language ON film.language_id = language.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES
('Inception'),
('The Matrix'),
('Interstellar'),
('The Godfather'),
('Pulp Fiction'),
('The Shawshank Redemption'),
('Forrest Gump'),
('The Dark Knight'),
('Fight Club'),
('The Lord of the Rings: The Return of the King');

SELECT * FROM new_film;

CREATE TABLE customer_review (
    review_id SERIAL NOT NULL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    review_text TEXT NOT NULL,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (film_id) references new_film(id) ON DELETE CASCADE,
    foreign key (language_id) references language(language_id)
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text) VALUES
(2, 1, 'Amazing Movie', 5, 'I loved this movie! The plot was fantastic and the acting was superb.'),
(7, 3, 'Emotional Rollercoaster', 4, 'A film that takes you through a range of emotions. Well done!');

SELECT * FROM customer_review;

DELETE FROM new_film WHERE id = 7; 
-- after deleting the film with id 7, the customer review with film_id 7 was also deleted due to the ON DELETE CASCADE constraint.



UPDATE film SET language_id = 2 WHERE film_id = 1;

SELECT * FROM film WHERE film_id = 1;

