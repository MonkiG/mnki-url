CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp

);

CREATE TABLE IF NOT EXISTS links(
    id UUID PRIMARY KEY NOT NULL DEFAULT get_random_uuid();
    original TEXT NOT NULL,
    alias TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp
);

CREATE TABLE IF NOT EXISTS user_link(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(id),
    link_id UUID REFERENCES links(id),
);


