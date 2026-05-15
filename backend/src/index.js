import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as Sentry from '@sentry/cloudflare'
import { books } from './routes/books.js'
import { categories } from './routes/categories.js'
import { loans } from './routes/loans.js'
import { users } from './routes/users.js'

const app = new Hono()

app.use('*', cors())

app.get('/health', (c) => c.json({ status: 'ok', env: c.env.ENVIRONMENT }))

app.get('/debug/error', () => {
  throw new Error('Error de prueba - APM Sentry funcionando')
})

app.route('/api/books', books)
app.route('/api/categories', categories)
app.route('/api/loans', loans)
app.route('/api/users', users)

app.onError((err, c) => {
  Sentry.captureException(err)
  return c.json({ error: 'Error interno del servidor' }, 500)
})

export default Sentry.withSentry(
  (env) => ({ dsn: env.SENTRY_DSN }),
  app
)
