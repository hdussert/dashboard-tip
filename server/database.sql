CREATE DATABASE dashboard_tip;

--users

CREATE TABLE users(
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

--deals

CREATE TABLE deals(
  id SERIAL,
  user_id INTEGER,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

--crew

CREATE TABLE workers(
  id SERIAL,
  manager_id INTEGER,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

--horaires

CREATE TABLE work(
  id SERIAL,
  worker_id INTEGER NOT NULL,
  deal_id INTEGER NOT NULL,
  date_start TIMESTAMP NOT NULL,
  date_end TIMESTAMP NOT NULL,
  FOREIGN KEY (worker_id) REFERENCES workers(id),
  FOREIGN KEY (deal_id) REFERENCES deals(id),
  PRIMARY KEY (id)
);