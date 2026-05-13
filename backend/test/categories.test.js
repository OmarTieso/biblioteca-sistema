import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../src/services/categories.js'

const mockCategories = [
  { id: 1, name: 'Literatura', description: 'Novelas y cuentos' },
  { id: 2, name: 'Ciencia', description: 'Libros científicos' }
]

const makeMockDB = () => ({
  prepare: (sql) => ({
    all: async () => ({ results: mockCategories }),
    bind: function (...args) { return this },
    run: async () => ({ success: true }),
    first: async () => mockCategories[0]
  })
})

describe('Categories Service', () => {
  test('getCategories devuelve lista de categorías', async () => {
    const result = await getCategories(makeMockDB())
    expect(result).toHaveLength(2)
  })

  test('getCategoryById devuelve una categoría', async () => {
    const result = await getCategoryById(makeMockDB(), 1)
    expect(result.name).toBe('Literatura')
  })

  test('createCategory retorna success', async () => {
    const result = await createCategory(makeMockDB(), { name: 'Historia', description: 'Libros históricos' })
    expect(result.success).toBe(true)
  })

  test('updateCategory retorna success', async () => {
    const result = await updateCategory(makeMockDB(), 1, { name: 'Literatura Clásica', description: 'Actualizada' })
    expect(result.success).toBe(true)
  })

  test('deleteCategory retorna success', async () => {
    const result = await deleteCategory(makeMockDB(), 1)
    expect(result.success).toBe(true)
  })
})
