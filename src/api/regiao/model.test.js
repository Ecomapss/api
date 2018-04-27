import { Regiao } from '.'

let regiao

beforeEach(async () => {
  regiao = await Regiao.create({ cidade: 'test', uf: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = regiao.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(regiao.id)
    expect(view.cidade).toBe(regiao.cidade)
    expect(view.uf).toBe(regiao.uf)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = regiao.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(regiao.id)
    expect(view.cidade).toBe(regiao.cidade)
    expect(view.uf).toBe(regiao.uf)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
