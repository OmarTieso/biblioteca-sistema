import { Hono } from 'hono'
import { getLoans, getLoansByUser, createLoan, returnLoan } from '../services/loans.js'

export const loans = new Hono()

loans.get('/', async (c) => {
  try {
    const data = await getLoans(c.env.DB)
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

loans.get('/user/:userId', async (c) => {
  try {
    const data = await getLoansByUser(c.env.DB, c.req.param('userId'))
    return c.json(data)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

loans.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const result = await createLoan(c.env.DB, body)
    return c.json(result, 201)
  } catch (err) {
    return c.json({ error: err.message }, 400)
  }
})

loans.put('/:id/return', async (c) => {
  try {
    const result = await returnLoan(c.env.DB, c.req.param('id'))
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 400)
  }
})
