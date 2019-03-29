# Node/Express API Backend for Phrases-store Application

This is the backend for the Phrases-store application. It provides the ability to add and request phrases stored in the PostgreSQL database and outputs the data as JSON.

## Prerequisites

You will need to install these applications before proceeding.

- PostgreSQL v11 and up
- Node v10.14.1 + npm

## Setup

To install application

1. git clone repo to local environment

   `git clone git@github.com:wongco/phrases-store-backend.git`

2. install packages using

   `cd phrases-store-backend`

   `npm install`

3. create postgres databases (local production and test)

   **CAUTION: this step will drop your existing databases if they exit**

   `createdb phrases-store`

   `createdb phrases-store-test`

4. setup tables and sample data by running seed file

   `psql phrases-store < seed.sql`

   `psql phrases-store-test < seed.sql`

5. startup server

   `npm start`

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

## Potential Improvements

- Add duplication check in phrase db model

## Author

WongCo - https://github.com/wongco
