import { useState, useEffect } from 'react'
import { api } from '../api/client.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', role: 'reader' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await api.users.getAll()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.users.create(form)
      setForm({ name: '', email: '', role: 'reader' })
      setShowForm(false)
      loadUsers()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Usuarios</h1>
        <button onClick={() => setShowForm(!showForm)}>+ Agregar usuario</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
          <input placeholder="Nombre completo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Correo electrónico" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="reader">Lector</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Guardar</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Nombre</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Correo</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{u.name}</td>
              <td style={{ padding: '0.5rem' }}>{u.email}</td>
              <td style={{ padding: '0.5rem' }}>{u.role === 'admin' ? 'Administrador' : 'Lector'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
