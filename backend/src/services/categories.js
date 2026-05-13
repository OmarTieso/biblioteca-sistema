export async function getCategories(db) {
  const result = await db.prepare('SELECT * FROM categories ORDER BY name').all()
  return result.results
}

export async function getCategoryById(db, id) {
  return await db.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first()
}

export async function createCategory(db, { name, description }) {
  await db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').bind(name, description).run()
  return { success: true }
}

export async function updateCategory(db, id, { name, description }) {
  await db.prepare('UPDATE categories SET name = ?, description = ? WHERE id = ?').bind(name, description, id).run()
  return { success: true }
}

export async function deleteCategory(db, id) {
  await db.prepare('DELETE FROM categories WHERE id = ?').bind(id).run()
  return { success: true }
}
