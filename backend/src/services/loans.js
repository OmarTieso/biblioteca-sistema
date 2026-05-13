export async function getLoans(db) {
  const result = await db.prepare('SELECT l.*, u.name as user_name, b.title as book_title FROM loans l JOIN users u ON l.user_id = u.id JOIN books b ON l.book_id = b.id ORDER BY l.loan_date DESC').all()
  return result.results
}

export async function getLoansByUser(db, userId) {
  const result = await db.prepare('SELECT l.*, b.title as book_title FROM loans l JOIN books b ON l.book_id = b.id WHERE l.user_id = ? ORDER BY l.loan_date DESC').bind(userId).all()
  return result.results
}

export async function createLoan(db, { userId, bookId }) {
  const book = await db.prepare('SELECT available FROM books WHERE id = ?').bind(bookId).first()
  if (!book) throw new Error('Libro no encontrado')
  if (!book.available) throw new Error('Libro no disponible')

  await db.prepare('INSERT INTO loans (user_id, book_id) VALUES (?, ?)').bind(userId, bookId).run()
  await db.prepare('UPDATE books SET available = 0 WHERE id = ?').bind(bookId).run()
  return { success: true }
}

export async function returnLoan(db, loanId) {
  const loan = await db.prepare('SELECT * FROM loans WHERE id = ? AND status = ?').bind(loanId, 'active').first()
  if (!loan) throw new Error('Préstamo no encontrado o ya devuelto')

  await db.prepare('UPDATE loans SET status = ?, return_date = CURRENT_TIMESTAMP WHERE id = ?').bind('returned', loanId).run()
  await db.prepare('UPDATE books SET available = 1 WHERE id = ?').bind(loan.book_id).run()
  return { success: true }
}
