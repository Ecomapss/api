import { Historia } from '.'

let historia

beforeEach(async () => {
  historia = await Historia.create({ titulo: 'test', descricao: 'test', elemento_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = historia.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(historia.id)
    expect(view.titulo).toBe(historia.titulo)
    expect(view.descricao).toBe(historia.descricao)
    expect(view.elemento_id).toBe(historia.elemento_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = historia.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(historia.id)
    expect(view.titulo).toBe(historia.titulo)
    expect(view.descricao).toBe(historia.descricao)
    expect(view.elemento_id).toBe(historia.elemento_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
