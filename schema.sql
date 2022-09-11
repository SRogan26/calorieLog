DROP DATABASE IF EXISTS my_calories_db;

CREATE DATABASE my_calories_db;
USE my_calories_db;

-- user table
CREATE TABLE people (
    person_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (person_id)
);

-- brand table
CREATE TABLE brands (
    brand_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (brand_id)
);
-- item table, FKs: Brand ID
CREATE TABLE items (
    item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL,
    fat INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    brand_id INT NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (brand_id) REFERENCES brands (brand_id)
);
-- eating log table, FKs: User ID, Item ID
CREATE TABLE log_entries (
    entry_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    time_log DATETIME NOT NULL,
    item_id INT NOT NULL,
    person_id INT NOT NULL,
    PRIMARY KEY (entry_id),
    FOREIGN KEY (item_id) REFERENCES items (item_id),
    FOREIGN KEY (person_id) REFERENCES people (person_id)
);