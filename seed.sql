DROP TABLE IF EXISTS phrases;

CREATE TABLE phrases
(
  id serial PRIMARY KEY,
  text text NOT NULL,
  createdAt timestamp DEFAULT current_timestamp NOT NULL
);

INSERT INTO phrases (text) VALUES
  ('Best First String!');