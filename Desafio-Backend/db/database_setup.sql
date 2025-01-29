CREATE DATABASE IF NOT EXISTS desafio_db;
USE desafio_db;

CREATE TABLE IF NOT EXISTS task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
);

INSERT INTO task (name, completed) VALUES 
('Comprar leche', 0),
('Hacer ejercicio', 1),
('Estudiar Symfony', 0),
('Preparar presentación', 1);
