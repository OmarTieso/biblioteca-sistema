import { getBooks, getBookById, getAvailableBooks, createBook, updateBook, deleteBook } from '../src/services/books.js'

const mockBooks = [
  { id: 1, title: 'Cien años de soledad', author: 'García Márquez', isbn: '978-0-06-088328-7', year: 1967, available: 1, category: 'Literatura' },
  { id: 2, title: 'El principito', author: 'Saint-Exupéry', isbn: '978-0-15-601219-5', year: 1943, available: 0, category: 'Infantil' }
]

const makeMockDB = (overrides = {}) => ({
  prepare: (sql) => ({
    all: overrides.all ?? (async () => ({ results: mockBooks })),
    bind: function (...args) { return this },
    run: overrides.run ?? (async () => ({ success: true })),
    first: overrides.first ?? (async () => mockBooks[0])
  })
})

describe('Books Service', () => {
  test('getBooks devuelve lista de libros', async () => {
    const result = await getBooks(makeMockDB())
    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Cien años de soledad')
  })

  test('getBookById devuelve un libro por id', async () => {
    const book = await getBookById(makeMockDB(), 1)
    expect(book).toBeDefined()
    expect(book.id).toBe(1)
  })

  test('getAvailableBooks devuelve solo libros disponibles', async () => {
    const available = mockBooks.filter(b => b.available === 1)
    const db = makeMockDB({ all: async () => ({ results: available }) })
    const result = await getAvailableBooks(db)
    expect(result.every(b => b.available === 1)).toBe(true)
  })

  test('createBook retorna success', async () => {
    const result = await createBook(makeMockDB(), {
      title: 'Don Quijote', author: 'Cervantes', isbn: '978-0-14-243723-4', year: 1605, categoryId: 1
    })
    expect(result.success).toBe(true)
  })

  test('updateBook retorna success', async () => {
    const result = await updateBook(makeMockDB(), 1, {
      title: 'Cien años (ed. 2)', author: 'García Márquez', isbn: '978-0-06-088328-7', year: 1967, categoryId: 1
    })
    expect(result.success).toBe(true)
  })

  test('deleteBook retorna success', async () => {
    const result = await deleteBook(makeMockDB(), 1)
    expect(result.success).toBe(true)
  })
})
