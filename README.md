# PokemonTinder

Fullstack-prosjekt:
- React (Vite) frontend
- Express.js backend
- PostgreSQL database
- Eksterne API-er: PokéAPI + Chuck Norris API

## Hvordan starte - klon prosjektet
git clone https://github.com/IngvildBri/PokemonTinder.git
cd PokemonTinder

## Backend
cd Backend
npm install
npm run dev

## Frontend
cd Frontend
npm install
npm start

## Database
Opprett en PostgreSQL database lokalt. 
Kjør SQL-filen i /Database for å opprette tabellene.
Tabeller som opprettes:
    - users
    - pokemon_userchoice

## Environment variables
Opprett en .env fil i /Backend
    PORT=5002
    DATABASE_URL=postgres://<user>:<password>@localhost:5432/<database>
    token_secret=<Your secret key>

## Overview API-endpoints
Auth
- POST /signup
- POST /login

Pokemon
- GET /pokemon/next
- POST /pokemon/like
- POST /pokemon/dislike
- GET /pokemon/favorites


## Testing
You can test backend-enpoints with Postman

