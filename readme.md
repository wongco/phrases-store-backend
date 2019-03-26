# Node/Express API Backend for Phrases-store Application

This is the backend for the phrases-store application. It provides the ability to add and request phrases stored in the PostgreSQL database and outputs the data as JSON.

## Setup

To install application

1. git clone repo to local environment
2. install packages using

   `npm install`

3. create postgres databases (local production and test)

   `createdb phrases-store`

   `createdb phrases-store-test`

4. setup table and sample data by running seed file

   `psql phrases-store < seed.sql`

   `psql phrases-store-test < seed.sql`

5. startup server

   `node servers.js`

## Running Tests

In the root folder, run:

    `npm test`

## Endpoints

- GET - /phrases (pagination and limit options)
- POST - /phrases

## Built With

- Node.js - Server Language
- Express.js - Node Web Framework
- PostgreSQL - SQL Database
- dotenv - Env Variable Parser
- jsonschema - JSON Validation Library
- pg - PostgreSQL client for Node.js
- cors - Cross Origin Resource Sharing Library

Testing stack:

- jest - Testing Library
- supertest - Testing Library (mock http requests)
- morgan - HTTP Request Logger

## Future Addons

- Add duplication check in phrase db model

## Author

WongCo - https://github.com/wongco
