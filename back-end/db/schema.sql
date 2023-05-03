-- If our db already exists, drop it
DROP DATABASE IF EXISTS bookmarks_dev;

-- CREATE DATABASE 
CREATE DATABASE bookmarks_dev;

-- Connect to db
\c bookmarks_dev;

-- create a table for our bookmarks
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT,
    category TEXT,
    is_favorite BOOLEAN
);

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     email TEXT NOT NULL,
--     password TEXT NOT NULL,
-- )

-- Reviews table
-- Attributes? content, title, rating 0-5, reviewer,

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer TEXT,
    title TEXT,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5),
    bookmark_id INTEGER REFERENCES bookmarks (id)
    ON DELETE CASCADE
);