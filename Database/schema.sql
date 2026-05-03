CREATE TABLE users(
    id SERIAL PRIMARY KEY,  
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE pokemon_userchoice (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    pokemon_id INT NOT NULL,
    liked BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, pokemon_id)
);


