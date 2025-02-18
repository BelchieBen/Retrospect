# Retrospect

This repository contains the source code for the applications that make up Retrospect, Team Spartan's hackathon project, a Trello replacement build for Ideagen.

## Applications

Retrospect has 3 applications which are:

- NextJS Frontend
- Websocket server
- Prisma DB Client

### Frontend

A full stack NextJS application which uses [TRPC](https://trpc.io/) as an API layer and [Tailwind CSS](https://tailwindcss.com/) for styling. It also uses the [shadcn](https://ui.shadcn.com/) component library to provide the core UI building blocks, all shadcn are built using Tailwind and are installed locally to Retrospect's source code, providing us with control and flexability when styling. Database operations are handled using [Prisma](https://www.prisma.io/) and the Prisma client is consumed from the [Prisma DB Client application](#prisma-db-client) application.

AWS Amplify is used to host the Frontend as it simplifies the entire deployment process and nativly supports NextJS applications.

### Websocket Server

A dedicated ExpressJS server using [Socket.IO](https://socket.io/) for websocket connections, since the Frontend NextJS application has its own TRPC API the only purpose of this application is to subscribe to the database and publish realtime events when data has changed. Allowing the clients to update data in realtime. Database changes are surfaced using the [pg-realtime](https://www.npmjs.com/package/pg-realtime) package and any insert or query operations are done using Prisma. This server also consumed the same Prisma client publihsed from the [Prisma Db Client](#prisma-db-client) application.

### Prisma DB Client

A library which contains the Prisma schema for Retrospect's database and the commands to generate a Prisma client. This library is published as an npm package which can be consumed in the Frontend and Websocket server.

## Getting started

To get a local instance of Retrospect running you need to have the following installed on your machine:

- Docker
- NodeJS (v22.11.0)

Then copy the `.env` files from Keeper into the appropriate directory, e.g. `frontend.env` -> `frontend/.env`

Then run the following commands to install and start the applications:

```
cd ~/Retrospect/frontend
npm i
.\start-database.sh
npm run dev
cd ~/Retrospect/server
npm i
npm start
```

Retrospect should now be available at http://localhost:3000/ 
