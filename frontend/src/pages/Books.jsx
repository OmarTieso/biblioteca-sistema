import { useState, useEffect } from 'react'
import { api } from '../api/client.js'

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', author: '', isbn: '', year: '', categoryId: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { loadBooks() }, [])

  async function loadBooks() {
    try {
      setLoading(true)
      const data = await api.books.getAll()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.books.create(form)
      setForm({ title: '', author: '', isbn: '', year: '', categoryId: '' })
      setShowForm(false)
      loadBooks()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este libro?')) return
    try {
      await api.books.delete(id)
      loadBooks()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Libros</h1>
        <button onClick={() => setShowForm(!showForm)}>+ Agregar libro</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
          <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Autor" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
          <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} />
          <input placeholder="Año" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
          <input placeholder="ID Categoría" type="number" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} />
          <button type="submit">Guardar</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Título</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Autor</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Categoría</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Disponible</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{book.title}</td>
              <td style={{ padding: '0.5rem' }}>{book.author}</td>
              <td style={{ padding: '0.5rem' }}>{book.category || '-'}</td>
              <td style={{ padding: '0.5rem' }}>{book.available ? 'Sí' : 'No'}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => handleDelete(book.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
