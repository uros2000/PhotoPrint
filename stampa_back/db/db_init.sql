-- MySQL script

DROP DATABASE IF EXISTS photostudio;
CREATE DATABASE photostudio;
USE photostudio;

CREATE TABLE user(
    username VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    street VARCHAR(255),
    streetnumber VARCHAR(31),
    city VARCHAR(255),
    zip INTEGER,
    phone VARCHAR(31),
    PRIMARY KEY (username)
);

CREATE TABLE print_request(
    request_id INTEGER NOT NULL AUTO_INCREMENT,
    status VARCHAR(15) NOT NULL, -- new, accepted, sent
    request_type VARCHAR(31) NOT NULL, -- photo_batch
    PRIMARY KEY (request_id)
);

CREATE TABLE print_request_client_data(
    name VARCHAR(255),
    surname VARCHAR(255),
    street VARCHAR(255),
    streetnumber VARCHAR(31),
    city VARCHAR(255),
    zip INTEGER,
    phone VARCHAR(31),
    request_id INTEGER NOT NULL,

    FOREIGN KEY request_id
        REFERENCES print_request(request_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE print_request_photo_batch(
    request_id INTEGER NOT NULL,
    photo VARCHAR(4095), -- Path to uploaded photo

    FOREIGN KEY request_id
        REFERENCES print_request(request_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);
