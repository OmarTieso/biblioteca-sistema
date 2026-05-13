export async function getBooks(db) {
  const result = await db.prepare('SELECT b.*, c.name as category FROM books b LEFT JOIN categories c ON b.category_id = c.id ORDER BY b.title').all()
  return result.results
}

export async function getBookById(db, id) {
  return await db.prepare('SELECT b.*, c.name as category FROM books b LEFT JOIN categories c ON b.category_id = c.id WHERE b.id = ?').bind(id).first()
}

export async function getAvailableBooks(db) {
  const result = await db.prepare('SELECT * FROM books WHERE available = 1 ORDER BY title').all()
  return result.results
}

export async function createBook(db, { title, author, isbn, year, categoryId }) {
  await db.prepare('INSERT INTO books (title, author, isbn, year, category_id) VALUES (?, ?, ?, ?, ?)').bind(title, author, isbn, year, categoryId).run()
  return { success: true }
}

export async function updateBook(db, id, { title, author, isbn, year, categoryId }) {
  await db.prepare('UPDATE books SET title = ?, author = ?, isbn = ?, year = ?, category_id = ? WHERE id = ?').bind(title, author, isbn, year, categoryId, id).run()
  return { success: true }
}

export async function deleteBook(db, id) {
  await db.prepare('DELETE FROM books WHERE id = ?').bind(id).run()
  return { success: true }
}
