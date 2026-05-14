import { Hono } from 'hono'
import { getUsers, createUser } from '../services/users.js'

export const users = new Hono()

users.get('/', async (c) => {
  try {
    const data = await getUsers(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

users.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const result = await createUser(c.env.DB, body)
    return c.json(result, 201)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})
