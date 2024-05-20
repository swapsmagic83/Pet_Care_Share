CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users,
    name VARCHAR(25) NOT NULL,
    birth_year INTEGER NOT NULL,
    breed VARCHAR(50),
    species VARCHAR(25) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    date_to DATE,
    date_from DATE
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users,
    post_id INTEGER NOT NULL REFERENCES posts,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sent_at TIMESTAMP,
    sender_id INTEGER NOT NULL REFERENCES users,
    receiver_id INTEGER NOT NULL REFERENCES users,
    msg_content TEXT NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id_to INTEGER NOT NULL REFERENCES users,
    user_id_from INTEGER NOT NULL REFERENCES users,
    date TIMESTAMP,
    detail TEXT,
    stars INTEGER NOT NULL
);