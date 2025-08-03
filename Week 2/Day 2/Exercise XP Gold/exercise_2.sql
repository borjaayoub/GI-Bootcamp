-- Update birth dates for Lea and Marc Benichou to 02/11/1998
UPDATE students 
SET birth_date = '02/11/1998' 
WHERE first_name IN ('Lea', 'Marc') AND last_name = 'Benichou';

-- Change David's last name from 'Grez' to 'Guez'
UPDATE students 
SET last_name = 'Guez' 
WHERE first_name = 'David' AND last_name = 'Grez';

-- Delete Lea Benichou from the table
DELETE FROM students 
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- Count how many students are in the table
SELECT COUNT(*) as total_students FROM students;

-- Count how many students were born after 1/01/2000
SELECT COUNT(*) as students_born_after_2000 FROM students WHERE birth_date > '01/01/2000';

-- Add a column to the student table called math_grade
ALTER TABLE students ADD COLUMN math_grade INTEGER;

-- Add 80 to the student which id is 1
UPDATE students SET math_grade = 80 WHERE id = 1;

-- Add 90 to the students which have ids of 2 or 4
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);

-- Add 40 to the student which id is 6
UPDATE students SET math_grade = 40 WHERE id = 6;

-- Count how many students have a grade bigger than 83
SELECT COUNT(*) as students_with_grade_over_83 FROM students WHERE math_grade > 83;

-- Add another student named 'Omer Simpson' with the same birth_date as the one already in the table. Give him a grade of 70.
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT 'Omer', 'Simpson', birth_date, 70
FROM students 
WHERE first_name = 'Omer' AND last_name = 'Simpson'
LIMIT 1;

-- Count how many grades each student has
SELECT first_name, last_name, COUNT(*) as total_grade
FROM students 
GROUP BY first_name, last_name
ORDER BY last_name, first_name;

-- Verify the updates
SELECT first_name, last_name, birth_date, math_grade FROM students ORDER BY last_name, first_name;

-- Find the sum of all students' grades
SELECT SUM(math_grade) as total_grades_sum FROM students;
