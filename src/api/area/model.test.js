import { Area } from '.'

let area

beforeEach(async () => {
  area = await Area.create({ nome: 'test', categoria: 'test', areacol: 'test', id_regiao: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = area.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(area.id)
    expect(view.nome).toBe(area.nome)
    expect(view.categoria).toBe(area.categoria)
    expect(view.areacol).toBe(area.areacol)
    expect(view.id_regiao).toBe(area.id_regiao)    
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = area.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(area.id)
    expect(view.nome).toBe(area.nome)
    expect(view.categoria).toBe(area.categoria)
    expect(view.areacol).toBe(area.areacol)
    expect(view.id_regiao).toBe(area.id_regiao)        
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
