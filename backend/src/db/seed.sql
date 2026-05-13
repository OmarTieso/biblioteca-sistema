-- Categorias
INSERT OR IGNORE INTO categories (id, name, description) VALUES
  (1, 'Ciencias de la Computación', 'Libros sobre programación, algoritmos y sistemas'),
  (2, 'Matemáticas', 'Álgebra, cálculo y estadística'),
  (3, 'Literatura', 'Novelas, cuentos y poesía'),
  (4, 'Historia', 'Historia universal y local');

-- Libros
INSERT OR IGNORE INTO books (id, title, author, isbn, year, available, category_id) VALUES
  (1, 'Clean Code', 'Robert C. Martin', '9780132350884', 2008, 1, 1),
  (2, 'The Pragmatic Programmer', 'David Thomas', '9780201616224', 1999, 1, 1),
  (3, 'Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', 2009, 1, 1),
  (4, 'Calculus', 'James Stewart', '9781285741550', 2015, 1, 2),
  (5, 'Cien años de soledad', 'Gabriel García Márquez', '9780307474728', 1967, 1, 3),
  (6, 'Don Quijote de la Mancha', 'Miguel de Cervantes', '9788467021872', 1605, 1, 3),
  (7, 'Sapiens', 'Yuval Noah Harari', '9780062316097', 2011, 1, 4),
  (8, 'Design Patterns', 'Gang of Four', '9780201633610', 1994, 1, 1);

-- Usuarios
INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES
  (1, 'Admin Biblioteca', 'admin@biblioteca.edu', 'hashed_password_admin', 'admin'),
  (2, 'María López', 'maria.lopez@estudiante.edu', 'hashed_password_1', 'reader'),
  (3, 'Carlos Mendoza', 'carlos.mendoza@estudiante.edu', 'hashed_password_2', 'reader');

-- Prestamos de ejemplo
INSERT OR IGNORE INTO loans (id, user_id, book_id, status) VALUES
  (1, 2, 3, 'active'),
  (2, 3, 5, 'active');

-- Marcar libros prestados como no disponibles
UPDATE books SET available = 0 WHERE id IN (3, 5);
