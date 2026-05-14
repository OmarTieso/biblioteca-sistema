export async function getUsers(db) {
  const { results } = await db.prepare('SELECT id, name, email, role FROM users ORDER BY name').all()
  return results
}

export async function createUser(db, { name, email, role = 'reader' }) {
  if (!name || !email) throw new Error('Nombre y email son requeridos')
  const result = await db.prepare(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
  ).bind(name, email, 'password123', role).run()
  return { id: result.meta.last_row_id, name, email, role }
}
