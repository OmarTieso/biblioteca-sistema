import { Hono } from 'hono'
import { getBooks, getBookById, getAvailableBooks, createBook, updateBook, deleteBook } from '../services/books.js'

export const books = new Hono()

books.get('/', async (c) => {
  try {
    const data = await getBooks(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

books.get('/available', async (c) => {
  try {
    const data = await getAvailableBooks(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

books.get('/:id', async (c) => {
  try {
    const book = await getBookById(c.env.DB, c.req.param('id'))
    if (!book) return c.json({ error: 'Libro no encontrado' }, 404)
    return c.json(book)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

books.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const result = await createBook(c.env.DB, body)
    return c.json(result, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

books.put('/:id', async (c) => {
  try {
    const body = await c.req.json()
    const result = await updateBook(c.env.DB, c.req.param('id'), body)
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

books.delete('/:id', async (c) => {
  try {
    const result = await deleteBook(c.env.DB, c.req.param('id'))
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})
