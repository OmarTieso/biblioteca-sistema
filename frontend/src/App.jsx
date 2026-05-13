import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Books from './pages/Books.jsx'
import Loans from './pages/Loans.jsx'
import Categories from './pages/Categories.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<Books />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </>
  )
}
