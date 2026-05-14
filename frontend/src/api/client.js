const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`)
  return res.json()
}

export const api = {
  books: {
    getAll: () => request('/api/books'),
    getAvailable: () => request('/api/books/available'),
    getById: (id) => request(`/api/books/${id}`),
    create: (data) => request('/api/books', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/api/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/api/books/${id}`, { method: 'DELETE' })
  },
  categories: {
    getAll: () => request('/api/categories'),
    create: (data) => request('/api/categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/api/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/api/categories/${id}`, { method: 'DELETE' })
  },
  loans: {
    getAll: () => request('/api/loans'),
    getByUser: (userId) => request(`/api/loans/user/${userId}`),
    create: (data) => request('/api/loans', { method: 'POST', body: JSON.stringify(data) }),
    return: (id) => request(`/api/loans/${id}/return`, { method: 'PUT' })
  },
  users: {
    getAll: () => request('/api/users'),
    create: (data) => request('/api/users', { method: 'POST', body: JSON.stringify(data) })
  }
}
