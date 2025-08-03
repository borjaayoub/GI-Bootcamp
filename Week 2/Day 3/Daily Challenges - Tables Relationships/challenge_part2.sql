CREATE TABLE book(
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS student;

INSERT INTO book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

SELECT * FROM student;

CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INT NOT NULL CHECK (age <= 15)
);

DROP TABLE IF EXISTS student;

INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE library(
    book_fk_id INT,
    student_fk_id INT,
    borrow_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id),
    FOREIGN KEY (book_fk_id) REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO library (book_fk_id, student_fk_id, borrow_date) VALUES
(
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM student WHERE name = 'John'),
    '2022-02-15'
),(
    (SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM student WHERE name = 'Bob'),
    '2021-03-03'
),(
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM student WHERE name = 'Lera'),
    '2022-05-25'
),(
    (SELECT book_id FROM book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM student WHERE name = 'Bob'),
    '2022-08-12'
)

SELECT * FROM library;

SELECT s.name, b.title FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

SELECT avg(s.age) AS average_age FROM student s
JOIN library l ON s.student_id = l.student_fk_id
WHERE l.book_fk_id = (SELECT book_id FROM book WHERE title = 'Alice In Wonderland');

DELETE FROM student WHERE name = 'Bob';
-- all bob's borrowed books got deleted because of ON DELETE CASCADE rule.