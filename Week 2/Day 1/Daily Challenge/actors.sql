CREATE TABLE actors (
    actors_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age DATE NOT NULL,
    number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars) VALUES
('Matt','Damon','08/10/1970', 5),
('George','Clooney','06/05/1961', 2),
('Brad','Pitt','12/18/1963', 1),
('Leonardo','DiCaprio','11/11/1974', 1),
('Meryl','Streep','06/22/1949', 3),
('Robert','De Niro','08/17/1943', 2),
('Al','Pacino','04/25/1940', 2),
('Scarlett','Johansson','11/22/1984', 1),
('Harrison','Ford','07/13/1942', 0),
('Julia','Roberts','10/28/1967', 1);

SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars) VALUES
('', '', '01/01/1900', 0);

SELECT * FROM actors;