import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ background: '#1a1a2e', padding: '1rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '1.2rem' }}>Biblioteca</span>
      <Link to="/books" style={{ color: '#fff', textDecoration: 'none' }}>Libros</Link>
      <Link to="/loans" style={{ color: '#fff', textDecoration: 'none' }}>Préstamos</Link>
      <Link to="/categories" style={{ color: '#fff', textDecoration: 'none' }}>Categorías</Link>
    </nav>
  )
}
