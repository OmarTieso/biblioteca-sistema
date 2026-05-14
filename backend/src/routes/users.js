import { Hono } from 'hono'
import { getUsers } from '../services/users.js'

export const users = new Hono()

users.get('/', async (c) => {
  try {
    const data = await getUsers(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})
