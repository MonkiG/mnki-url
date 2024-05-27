DROP TABLE IF EXISTS urls CASCADE;
DROP TABLE IF EXISTS user_url CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp

);

CREATE TABLE IF NOT EXISTS urls(
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    original TEXT NOT NULL,
    hash TEXT NOT NULL UNIQUE,
    alias TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS user_url(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(id),
    url_id UUID REFERENCES links(id)
);


