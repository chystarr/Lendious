# Lendious - Group 6 Capstone Project

## Build Instructions

Node.js version >= 16 and PostgreSQL version >= 14 should be installed

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

## Tech Stack

- Frontend: React, React Router, Bootstrap, Socket.IO
- Backend: Node.js, Express.js, Sequelize.js, PostgreSQL, Socket.IO
