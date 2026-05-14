export async function getUsers(db) {
  const { results } = await db.prepare('SELECT id, name, email, role FROM users ORDER BY name').all()
  return results
}
