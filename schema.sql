DROP DATABASE IF EXISTS vinsel_gym_manager;
CREATE DATABASE IF NOT EXISTS vinsel_gym_manager;
USE vinsel_gym_manager;

CREATE TABLE clientes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(80) NOT NULL,
apellido VARCHAR(80) NOT NULL,
email VARCHAR(120) NOT NULL UNIQUE,
telefono VARCHAR(20),
fecha_nacimiento DATE,
fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
estado ENUM('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB;

CREATE TABLE planes_entrenamiento (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
duracion_semanas INT NOT NULL,
meta_fisica VARCHAR(150),
nivel ENUM('principiante','intermedio','avanzado') NOT NULL,
precio_base DECIMAL(10,2) NOT NULL,
estado ENUM('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB;

CREATE TABLE cliente_plan (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente_id INT NOT NULL,
plan_id INT NOT NULL,
fecha_asignacion DATE NOT NULL,
estado ENUM('activo','renovado','cancelado','finalizado') DEFAULT 'activo',

FOREIGN KEY (cliente_id) REFERENCES clientes(id),
FOREIGN KEY (plan_id) REFERENCES planes_entrenamiento(id)
) ENGINE=InnoDB;

CREATE TABLE contratos (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente_plan_id INT NOT NULL UNIQUE,
condiciones TEXT,
duracion_semanas INT NOT NULL,
precio DECIMAL(10,2) NOT NULL,
fecha_inicio DATE NOT NULL,
fecha_fin DATE NOT NULL,
estado ENUM('activo','cancelado','finalizado') DEFAULT 'activo',

FOREIGN KEY (cliente_plan_id) REFERENCES cliente_plan(id)
) ENGINE=InnoDB;

CREATE TABLE seguimiento_fisico (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente_plan_id INT NOT NULL,
fecha DATE NOT NULL,
peso_kg DECIMAL(5,2) NOT NULL,
grasa_corporal DECIMAL(4,2),
medidas TEXT,
foto_ruta VARCHAR(255),
comentarios TEXT,

FOREIGN KEY (cliente_plan_id) REFERENCES cliente_plan(id)
) ENGINE=InnoDB;

CREATE TABLE planes_nutricion (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente_plan_id INT NOT NULL,
nombre VARCHAR(100) NOT NULL,
meta_calorica INT,
fecha_inicio DATE NOT NULL,
fecha_fin DATE,

FOREIGN KEY (cliente_plan_id) REFERENCES cliente_plan(id)
) ENGINE=InnoDB;

CREATE TABLE alimentos_registro (
id INT AUTO_INCREMENT PRIMARY KEY,
plan_nutricion_id INT NOT NULL,
fecha DATE NOT NULL,
nombre_alimento VARCHAR(120) NOT NULL,
calorias INT NOT NULL,
peso_kg DECIMAL(5,2) NOT NULL,


FOREIGN KEY (plan_nutricion_id) REFERENCES planes_nutricion(id)
) ENGINE=InnoDB;

CREATE TABLE pagos (
id INT AUTO_INCREMENT PRIMARY KEY,
contrato_id INT NULL,
tipo ENUM('ingreso','egreso') NOT NULL,
categoria VARCHAR(80) NOT NULL,
monto DECIMAL(10,2) NOT NULL,
fecha DATE NOT NULL,
descripcion VARCHAR(200),

FOREIGN KEY (contrato_id) REFERENCES contratos(id)
) ENGINE=InnoDB;