-- MySQL script

DROP DATABASE IF EXISTS photostudio;
CREATE DATABASE photostudio;
USE photostudio;

CREATE TABLE user(
    username VARCHAR(255),
    password: VARCHAR(255),
    name: VARCHAR(255),
    surname: VARCHAR(255),
    street: VARCHAR(255),
    streetnumber: VARCHAR(31),
    city: VARCHAR(255),
    zip: INTEGER,
    phone: VARCHAR(31));
    