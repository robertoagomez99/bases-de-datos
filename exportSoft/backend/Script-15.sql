-- crear_base_datos.sql
-- Script para crear la base de datos y tablas de la Biblioteca

-- NOTA: Primero crea la base de datos en PostgreSQL:
-- CREATE DATABASE biblioteca_comunitaria;

-- Luego conecta a esa base de datos y ejecuta las siguientes sentencias:

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    identificacion VARCHAR(60) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(255) NOT NULL
);

-- Crear tabla autores
CREATE TABLE IF NOT EXISTS autores (
    id_autor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear tabla libros
CREATE TABLE IF NOT EXISTS libros (
    isbn VARCHAR(20) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    anio_publicacion INTEGER,
    id_autor INTEGER,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor) ON DELETE CASCADE
);

-- Crear tabla prestamos
CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    fecha_prestamos DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('entregado', 'retrasado', 'activo')) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (isbn) REFERENCES libros(isbn) ON DELETE CASCADE
);

-- Reiniciar secuencias para comenzar desde 1 (opcional)
-- ALTER SEQUENCE usuarios_id_usuario_seq RESTART WITH 1;
-- ALTER SEQUENCE autores_id_autor_seq RESTART WITH 1;
-- ALTER SEQUENCE prestamos_id_prestamo_seq RESTART WITH 1;

-- Mensaje de confirmación
-- SELECT '✅ Base de datos y tablas creadas exitosamente' as mensaje;