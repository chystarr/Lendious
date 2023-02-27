# Lendious

## Instructions for running the app
- Have two terminals open
- In one terminal:
```
cp .env.example .env
npm install
npm run dev
```
- In the other terminal:
```
cd client
npm install
npm start
```

## Stack

> Node.js v16 LTS is recommended

_Backend API_

- express.js (v4.18.2)
- sequelize.js (v6.25.2)
- PostgreSQL (v14 recommended)

_Frontend React client_

- Based on `create-react-app`
  - pre-configured to work with the api
- Bootstrap (v5)
  - added to `/client/public/index.html` (_optional_ can be removed)
- React Router (v6)
