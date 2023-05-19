# Lendious - Group 6 Capstone Project

## Build Instructions

Node.js LTS version >= 16 and PostgreSQL LTS version >= 14 should be installed

Clone the repository and have two terminals open

Run the server/backend in one terminal:
```
cp .env.example .env
npm install
npm run dev
```
Run the client/frontend in the other terminal:
```
cd client
npm install
npm start
```
Use the following credentials for the Postgres server:
- Username: lendy_user
- Password: lendy_pass
- Database name: lendyDB

## Testing

There exist two users pre-loaded into the database, Dan and Test, with the following credentials:

User 1 - Dan:
- email: dan@gmail.com
- password: test123

User 2 - Test
- email: test@gmail.com
- password: test123

Login into the app with any users credentials and you will be greeted with pre-made listings and requests to simulate what the real world app experience would be like. 

Both users are part of the same building, "170 Amsterdam Apartments".
When creating your own account, it is best to join the same building as the other options may not have user activity pre-seeded into them.

## API Testing and Documentation

[Postman collection used for endpoint testing (Postman account required)](https://solar-spaceship-776682.postman.co/workspace/Lendious-Workspace~efd69f12-b387-461c-8ea1-c9b03ac53fc8/collection/23311998-c29dca1a-998b-44c0-9091-97ed36876109?action=share&creator=23311998)


## Tech Stack

- Frontend: React, React Router, Bootstrap, Socket.IO
- Backend: Node.js, Express.js, Sequelize.js, PostgreSQL, Socket.IO

***

See citations.md for information on resources used
