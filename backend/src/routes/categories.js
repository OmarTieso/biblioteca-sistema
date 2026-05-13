import { Hono } from 'hono'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/categories.js'

export const categories = new Hono()

categories.get('/', async (c) => {
  try {
    const data = await getCategories(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

categories.get('/:id', async (c) => {
  try {
    const category = await getCategoryById(c.env.DB, c.req.param('id'))
    if (!category) return c.json({ error: 'Categoría no encontrada' }, 404)
    return c.json(category)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

categories.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const result = await createCategory(c.env.DB, body)
    return c.json(result, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

categories.put('/:id', async (c) => {
  try {
    const body = await c.req.json()
    const result = await updateCategory(c.env.DB, c.req.param('id'), body)
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

categories.delete('/:id', async (c) => {
  try {
    const result = await deleteCategory(c.env.DB, c.req.param('id'))
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})
