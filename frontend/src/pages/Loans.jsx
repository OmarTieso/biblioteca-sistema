import { useState, useEffect } from 'react'
import { api } from '../api/client.js'

export default function Loans() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ userId: '', bookId: '' })

  useEffect(() => { loadLoans() }, [])

  async function loadLoans() {
    try {
      setLoading(true)
      const data = await api.loans.getAll()
      setLoans(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.loans.create(form)
      setForm({ userId: '', bookId: '' })
      loadLoans()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleReturn(id) {
    try {
      await api.loans.return(id)
      loadLoans()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Préstamos</h1>

      <form onSubmit={handleSubmit} style={{ margin: '1rem 0', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label>ID Usuario</label><br />
          <input type="number" value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required />
        </div>
        <div>
          <label>ID Libro</label><br />
          <input type="number" value={form.bookId} onChange={e => setForm({ ...form, bookId: e.target.value })} required />
        </div>
        <button type="submit">Registrar Préstamo</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Usuario</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Libro</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Fecha</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Estado</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{loan.user_name}</td>
              <td style={{ padding: '0.5rem' }}>{loan.book_title}</td>
              <td style={{ padding: '0.5rem' }}>{new Date(loan.loan_date).toLocaleDateString('es-MX')}</td>
              <td style={{ padding: '0.5rem' }}>{loan.status === 'active' ? 'Activo' : 'Devuelto'}</td>
              <td style={{ padding: '0.5rem' }}>
                {loan.status === 'active' && (
                  <button onClick={() => handleReturn(loan.id)}>Devolver</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
