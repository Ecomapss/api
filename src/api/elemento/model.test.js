import { Elemento } from '.'

let elemento

beforeEach(async () => {
  elemento = await Elemento.create({ info: 'test', estado: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = elemento.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(elemento.id)
    expect(view.info).toBe(elemento.info)
    expect(view.estado).toBe(elemento.estado)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = elemento.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(elemento.id)
    expect(view.info).toBe(elemento.info)
    expect(view.estado).toBe(elemento.estado)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
