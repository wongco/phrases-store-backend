# Node/Express API Backend for Phrase-store Application

This is the backend for the phrase-store application. It provides the ability to add and request phrases stored in the PostgreSQL database and outputs the data as JSON.

## Setup

To install application

1. git clone repo to local environment
2. install packages using

   `npm install`

3. create postgres database & table sample data by running seed file

   `psql -f seed.sql`

4. startup server

   `node servers.js`

## Endpoints

GET - /phrases (pagination and limit options)

POST - /phrases

## Future Addons

- Further Exploration:

  - Add duplication check in phrase db model
