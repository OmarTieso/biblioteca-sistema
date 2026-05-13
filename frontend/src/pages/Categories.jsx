import { useState, useEffect } from 'react'
import { api } from '../api/client.js'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })

  useEffect(() => { loadCategories() }, [])

  async function loadCategories() {
    const data = await api.categories.getAll()
    setCategories(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await api.categories.create(form)
    setForm({ name: '', description: '' })
    loadCategories()
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar categoría?')) return
    await api.categories.delete(id)
    loadCategories()
  }

  return (
    <div>
      <h1>Categorías</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{cat.name}</strong> — {cat.description}</span>
            <button onClick={() => handleDelete(cat.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
