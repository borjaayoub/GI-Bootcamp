-- Create the 'books' database if it doesn't exist
CREATE DATABASE books;



-- Create the 'books' table
CREATE TABLE IF NOT EXISTS books (
id SERIAL PRIMARY KEY,
title VARCHAR(50) NOT NULL,
author VARCHAR(50) NOT NULL,
published_year INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS books CASCADE;