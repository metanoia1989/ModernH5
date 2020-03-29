CREATE DATABASE student;

USE student;

CREATE TABLE student (
    id INT KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    chinese INT NOT NULL,
    english INT NOT NULL,
    math INT NOT NULL
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;