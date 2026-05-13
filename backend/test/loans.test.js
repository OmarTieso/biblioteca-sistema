import { getLoans, getLoansByUser, createLoan, returnLoan } from '../src/services/loans.js'

const mockLoan = { id: 1, user_id: 1, book_id: 1, status: 'active', user_name: 'Omar', book_title: 'El principito' }

const makeMockDB = (bookAvailable = 1, loanFound = true) => ({
  prepare: (sql) => ({
    all: async () => ({ results: [mockLoan] }),
    bind: function (...args) { return this },
    run: async () => ({ success: true }),
    first: async () => {
      if (sql.includes('books')) return { id: 1, available: bookAvailable }
      if (sql.includes('loans')) return loanFound ? mockLoan : null
      return null
    }
  })
})

describe('Loans Service', () => {
  test('getLoans devuelve lista de préstamos', async () => {
    const result = await getLoans(makeMockDB())
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('active')
  })

  test('getLoansByUser devuelve préstamos de un usuario', async () => {
    const result = await getLoansByUser(makeMockDB(), 1)
    expect(result).toHaveLength(1)
    expect(result[0].user_id).toBe(1)
  })

  test('createLoan con libro disponible retorna success', async () => {
    const result = await createLoan(makeMockDB(1), { userId: 1, bookId: 1 })
    expect(result.success).toBe(true)
  })

  test('createLoan con libro no disponible lanza error', async () => {
    await expect(createLoan(makeMockDB(0), { userId: 1, bookId: 1 }))
      .rejects.toThrow('Libro no disponible')
  })

  test('returnLoan con préstamo activo retorna success', async () => {
    const result = await returnLoan(makeMockDB(1, true), 1)
    expect(result.success).toBe(true)
  })

  test('returnLoan con préstamo inexistente lanza error', async () => {
    await expect(returnLoan(makeMockDB(1, false), 99))
      .rejects.toThrow('Préstamo no encontrado')
  })
})
